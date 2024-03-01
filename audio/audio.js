const audio = {
    Pregame: new Howl({
        src: './audio/pregameMusic.wav',
        html5: true
        // volume: any value from 0 to 1
    }),
    Maingame: new Howl({
        src: './audio/maingameMusic.wav',
        html5: true
    }),
    Gong: new Howl({
        src: './audio/gong.wav',
        html5: true
    })
}