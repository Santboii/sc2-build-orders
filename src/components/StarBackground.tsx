export default function StarBackground() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                background: 'white',
                boxShadow: '0 0 10px white, 10vw 10vh 0 1px white, 20vw 20vh 0 0 white, 30vw 5vh 0 1px white, 40vw 30vh 0 0 white, 50vw 15vh 0 1px white, 60vw 40vh 0 0 white, 70vw 25vh 0 1px white, 80vw 50vh 0 0 white, 90vw 10vh 0 1px white, 5vw 60vh 0 0 white, 15vw 70vh 0 1px white, 25vw 80vh 0 0 white, 35vw 90vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
                opacity: 0.5
            }} />
            <div style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                background: 'white',
                boxShadow: '10vw 80vh 0 1px white, 20vw 10vh 0 0 white, 30vw 90vh 0 1px white, 40vw 20vh 0 0 white, 50vw 70vh 0 1px white, 60vw 30vh 0 0 white, 70vw 60vh 0 1px white, 80vw 40vh 0 0 white, 90vw 50vh 0 1px white, 5vw 15vh 0 0 white, 15vw 25vh 0 1px white, 25vw 35vh 0 0 white, 35vw 45vh 0 1px white, 45vw 55vh 0 0 white, 55vw 65vh 0 1px white, 65vw 75vh 0 0 white, 75vw 85vh 0 1px white, 85vw 95vh 0 0 white, 95vw 5vh 0 1px white',
                opacity: 0.3,
                animation: 'twinkle 5s infinite'
            }} />
        </div>
    );
}
