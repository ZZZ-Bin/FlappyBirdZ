export default class Score {
  draw (num) {
    ctx.font = '30px Verdana'
    // 创建渐变
    // var gradient = ctx.createLinearGradient(0, 0, window['canvas'].width, 0)
    // gradient.addColorStop('0', 'red')
    // gradient.addColorStop('0.5', 'pink')
    // gradient.addColorStop('1.0', 'purple')
    // 用渐变填色
    // ctx.fillStyle = gradient
    ctx.fillStyle = 'red'
    ctx.textAlign = 'center'
    // ctx.shadowColor = '#222'
    // ctx.shadowBlur = 5
    ctx.fillText(num, window['canvas'].width / 2, 100)
    // ctx.shadowColor = ''
    // ctx.shadowBlur = 0
  }
}
