

function calculateMidpoint(object) {
    const middleX = object.position.x + object.width / 2
    const middleY = object.position.y + object.height / 2
    return {
        x: middleX,
        y: middleY
    }
}

function calculateDistance(object1, object2) {
    const dx = object1.position.x - (object2.position.x + object2.position.x / 4)
    const dy = object1.position.y - (object2.position.y)
    return Math.sqrt(dx * dx + dy * dy)
}