import json
import re
import sys

def format_steps(steps):
    lines = []
    lines.append("        steps: [")
    for step in steps:
        supply = step['supply']
        timing = step['timing']
        action = step['action'].replace("'", "\\'")
        
        line = f"            {{ supply: {supply}, timing: '{timing}', action: '{action}'"
        
        if 'trigger' in step:
             trigger = step['trigger'].replace("'", "\\'")
             line += f", trigger: '{trigger}'"
        if 'notes' in step:
             notes = step['notes'].replace("'", "\\'")
             line += f", notes: '{notes}'"
        line += " },"
        lines.append(line)
        
    lines.append("        ],")
    return "\n".join(lines)

def format_list(l):
    if not l: return "[]"
    # Format list of strings
    formatted = []
    for x in l:
        safe_x = x.replace("'", "\\'")
        formatted.append(f"'{safe_x}'")
    return f"[{', '.join(formatted)}]"

def update_db():
    try:
        with open('scraped_builds_full.json', 'r') as f:
            scraped_data = json.load(f)
    except Exception:
        print("No scraped data found.")
        return

    scraped_map = {b['id']: b for b in scraped_data}
    
    with open('src/data/buildOrders.ts', 'r') as f:
        content = f.read()

    start_marker = "export const buildOrders: BuildOrder[] = ["
    
    with open('src/data/buildOrders.ts', 'r') as f:
        lines = f.readlines()
        
    final_lines = []
    in_array = False
    buffer = []
    processed_ids = set()
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        if start_marker in line:
            final_lines.append(line)
            in_array = True
            i += 1
            continue
            
        if in_array and line.strip() == "];":
            if buffer:
                processed_chunk = process_chunk(buffer, scraped_map, processed_ids)
                final_lines.extend(processed_chunk)
                buffer = []
            
            # ADD NEW BUILDS
            for b_id, data in scraped_map.items():
                if b_id not in processed_ids:
                    final_lines.append(generate_new_entry(data))
            
            final_lines.append(line) # ];
            in_array = False
            i += 1
            continue
            
        if in_array:
            buffer.append(line)
            if re.search(r"^\s*},?", line):
                text = "".join(buffer)
                if identifier_in_text(text) and text.count('{') == text.count('}'):
                    processed_chunk = process_chunk(buffer, scraped_map, processed_ids)
                    final_lines.extend(processed_chunk)
                    buffer = []
        else:
            final_lines.append(line)
        i += 1
        
    with open('src/data/buildOrders.ts', 'w') as f:
        f.writelines(final_lines)

def identifier_in_text(text):
    return "id: '" in text

def process_chunk(lines, scraped_map, processed_ids):
    text = "".join(lines)
    m = re.search(r"id:\s*'([^']+)'", text)
    if not m:
        return lines # Comment block or formatting
        
    b_id = m.group(1)
    processed_ids.add(b_id)
    
    if b_id in scraped_map:
        data = scraped_map[b_id]
        
        new_steps = format_steps(data['steps']) # Assuming this works
        
        # Cleanly skipping old steps is hard, but we can do a line-by-line rewrite
        new_lines = []
        skip = False
        
        # Salt preprocessing
        safe_salt = ""
        if data.get('saltEncoding'):
             safe_salt = data['saltEncoding'].replace('`', '\\`')
        else:
             safe_salt = ""
             
        safe_url = data['spawningToolUrl']
        safe_patch = data['patch']
        
        for line in lines:
            if "steps: [" in line:
                new_lines.append(new_steps + "\n")
                skip = True
            elif skip:
                if "]," in line: # End of steps block
                    skip = False
                else:
                    continue
            elif "saltEncoding:" in line:
                 new_lines.append(f"        saltEncoding: `{safe_salt}`,\n")
            elif "spawningToolUrl:" in line:
                 new_lines.append(f"        spawningToolUrl: '{safe_url}',\n")
            elif "patch:" in line:
                new_lines.append(f"        patch: '{safe_patch}',\n")
            else:
                new_lines.append(line)
        
        # Add missing fields if not present
        result_text = "".join(new_lines)
        if "spawningToolUrl" not in result_text:
            # find last brace
            idx = result_text.rfind("}")
            if idx != -1:
                # Insert before it
                ins = f"        spawningToolUrl: '{safe_url}',\n"
                new_lines.insert(-1, ins) # approximate, assum last line is "},"
                
        return new_lines
            
    return lines

def generate_new_entry(data):
    safe_name = data['name'].replace('"', '\\"') if data['name'] else "Unknown"
    safe_playstyle = data['playStyle'].replace('"', '\\"') if data['playStyle'] else ""
    safe_salt = data['saltEncoding'].replace('`', '\\`') if data['saltEncoding'] else ""
    
    return f"""    {{
        id: '{data['id']}',
        name: "{safe_name}",
        race: '{data['race']}',
        vsRace: '{data['vsRace']}',
        matchup: '{data['matchup']}',
        difficulty: '{data['difficulty']}',
        buildType: '{data['buildType']}',
        playStyle: "{safe_playstyle}",
        goals: [],
{format_steps(data['steps'])}
        transitions: 'Transition macro',
        counters: [],
        weaknesses: [],
        patch: '{data['patch']}',
        spawningToolUrl: '{data['spawningToolUrl']}',
        saltEncoding: `{safe_salt}`
    }},
"""

if __name__ == "__main__":
    update_db()
