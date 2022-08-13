const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const tifinagh = "ⴰⴱⴳⴷⴹⴻⴼⴽⵀⵃⵄⵅⵇⵉⵊⵍⵯⵥⵣⵢⵡⵟⵜⵛⵚⵙⵖⵕⵔⵓⵏⵎⴲⴴⴵⴶⴸⴺⴿⵁⵒⵝⵞⵠ"
const nums = '0123456789'

const alphabet = tifinagh + nums

const fontSize = 16
const rows = Math.floor(canvas.height / fontSize)
const columns = Math.floor(canvas.width / fontSize)

const yPositions = new Array(columns)
const xPositions = new Array(columns)

class RainCode {
    constructor(x) {
        this.x = x
        this.Yindex = 0
        this.previousChar = undefined
    }
    drawNextChar() {
        context.font = fontSize + 'px monospace'
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        context.fillStyle = '#FFF'
        context.fillText(text, this.x, yPositions[this.Yindex])
        if (this.Yindex > 0) {
            context.fillStyle = '#0F0'
            context.fillText(this.previousChar, this.x, yPositions[this.Yindex - 1]) //redraw the previous char with green color
            this.previousChar = text
        }
        this.Yindex = (this.Yindex > rows && Math.random() > 0.9) ? 0 : this.Yindex + 1; // randomize the regeneration posibility
    }
}

let rainCodes = []

for (let index = 0; index < xPositions.length; index++) {
    xPositions[index] = index * fontSize
    rainCodes[index] = new RainCode(xPositions[index])
}
for (let index = 0; index < yPositions.length; index++) {
    yPositions[index] = index * fontSize
}

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    rainCodes.forEach(rainCode => { rainCode.drawNextChar() })

}

setInterval(draw, 50);