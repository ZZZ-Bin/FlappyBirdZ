export default class Score {
  draw (num) {
    ctx.font = '30px Verdana'
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    ctx.fillText(num, window['canvas'].width / 2, 100)
  }
}
