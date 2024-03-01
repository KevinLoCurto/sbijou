const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const offset = {
    x: -1450,
    y: -800
}

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
)

const image = new Image()
image.src = '/assets/world/map.png'

const linusDown = new Image()
linusDown.src = '/characters/players/linus/linusDown.png'

const linusUp = new Image()
linusUp.src = '/characters/players/linus/linusUp.png'

const linusLeft = new Image()
linusLeft.src = '/characters/players/linus/linusLeft.png'

const linusRight = new Image()
linusRight.src = '/characters/players/linus/linusRight.png'

const adminTableInitial = new Image()
adminTableInitial.src = '/assets/interactables/adminTableInitial.png'
const adminTableHighlighted = new Image()
adminTableHighlighted.src = '/assets/interactables/adminTableHighlighted.png'
const adminTableInteracted = new Image()
adminTableInteracted.src = '/assets/interactables/adminTableInteracted.png'

const testAdmin = new Image()
testAdmin.src = '/assets/interactables/testAdmin.png'

const linus = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: linusDown,
    frames: {
        max: 4
    },
    sprites: {
        up: linusUp,
        down: linusDown,
        left: linusLeft,
        right: linusRight
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const adminTable = new Interactable({
    position: {
        x: -690,
        y: 200
    },
    image: adminTableInitial,
    sprites: {
        init: adminTableInitial,
        high: adminTableHighlighted,
        inter: adminTableInteracted
    },
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    f: {
        pressed: false
    }
}

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 80) {
    collisionsMap.push(collisions.slice(i, 80 + i))
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
    })
})

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

const interactables = [adminTable]
const movables = [background, ...boundaries, ...interactables]

document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('game-screen').style.display = 'block'
    document.getElementById('main-menu').style.display = 'none'
    document.getElementById('testimage').style.display = 'none'
}) 
document.getElementById('instructions').addEventListener('click', () => {
    document.getElementById('main-menu').style.display = 'none'
    document.getElementById('testimage').style.display = 'none'
    document.getElementById('instruction-screen').style.display = 'block'
    document.getElementById('back').style.display = 'block'
})
document.getElementById('back').addEventListener('click', () => {
    document.getElementById('main-menu').style.display = 'block'
    document.getElementById('testimage').style.display = 'block'
    document.getElementById('back').style.display = 'none'
})
document.getElementById('restart').addEventListener('click', () => {
    document.getElementById('main-menu').style.display = 'block'
    document.getElementById('testimage').style.display = 'block'
    document.getElementById('end-screen').style.display = 'none'
})

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundaries => {
        boundaries.draw()
    })
    linus.draw()
    adminTable.draw()

    const distance = calculateDistance(linus, adminTable)

    let highlighted = false
    adminTable.highlighted = false

    if (distance <= 160) {
        highlighted = true
        console.log('interactable')
    } else if (distance > 160) {
        highlighted = false
    }
    if (highlighted === true) {
        adminTable.image = adminTable.sprites.high
    } else if (highlighted === false) {
        adminTable.image = adminTable.sprites.init
    }

    let moving = true
    linus.moving = false
    let interacted = false
    adminTable.interacted = false


    if (keys.w.pressed) {
        linus.moving = true
        linus.image = linus.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: linus,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 4
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        } if (moving)
            movables.forEach((movables) => {
                movables.position.y += 4
            })
    } else if (keys.a.pressed) {
        linus.moving = true
        linus.image = linus.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: linus,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 4,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movables) => {
                movables.position.x += 4
            })
    } else if (keys.s.pressed) {
        linus.moving = true
        linus.image = linus.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: linus,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 4
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movables) => {
                movables.position.y -= 4
            })
    } else if (keys.d.pressed) {
        linus.moving = true
        linus.image = linus.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: linus,
                    rectangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 4,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }
        if (moving)
            movables.forEach((movables) => {
                movables.position.x -= 4
            })
    } if (keys.f.pressed) {
        interacted = true
        highlighted = false
    }

    
    if (interacted === true) {
        adminTable.image = adminTable.sprites.inter
        highlighted = false
    } else if (interacted === false && highlighted === true) {
        adminTable.image = adminTable.sprites.high
    } else if (interacted === false && highlighted === false) {
        adminTable.image = adminTable.sprites.init
    }
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'f':
            keys.f.pressed = true
            lastKey = 'f'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})

