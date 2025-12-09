
import { buildOrders } from '../src/data/buildOrders';
import { unitDatabase } from '../src/data/unitData';

const validateBuilds = () => {
    console.log('Starting Build Order Integrity Scan...');
    let errorCount = 0;
    let warningCount = 0;

    buildOrders.forEach(build => {
        const race = build.race;
        // console.log(`Scanning build: ${build.name} (${race})`);

        build.steps.forEach((step, index) => {
            const actions = step.action.split(',').map(a => a.trim());

            actions.forEach(rawAction => {
                // Remove count (e.g., "Marine x2" -> "Marine")
                // Handle "Level 1" upgrades (e.g., "Terran Infantry Weapons Level 1")
                let cleanAction = rawAction.replace(/\s*x\d+$/, '');

                // Check against unitDatabase
                const unitData = unitDatabase[cleanAction];

                if (!unitData) {
                    // Check if it's a known upgrade not in unitDB or just generic text
                    // Some upgrades might be in unitDatabase as type 'upgrade'
                    // If absolutely not found, warn

                    // Specific check for "Infested" which indicates corruption
                    if (cleanAction.toLowerCase().includes('infested')) {
                        console.error(`[CRITICAL] Found corrupted unit in build '${build.id}' step ${index + 1}: ${rawAction}`);
                        errorCount++;
                    } else {
                        // warningCount++;
                        // console.warn(`[WARN] Unknown action in '${build.id}': ${cleanAction}`);
                    }
                } else {
                    // Check Race Match
                    // Neutral units are generally okay? (Not common in pure build orders)
                    if (unitData.race !== race && unitData.race !== 'Neutral') {
                        console.error(`[ERROR] Race Mismatch in build '${build.id}' step ${index + 1}: Found ${unitData.race} unit '${cleanAction}' in ${race} build.`);
                        errorCount++;
                    }
                }
            });
        });
    });

    console.log('Scan Complete.');
    console.log(`Errors found: ${errorCount}`);
    console.log(`Warnings found: ${warningCount}`);
};

validateBuilds();
