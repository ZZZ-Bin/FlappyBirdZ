import Pie from './Pie.js'

export default class PieDown extends Pie {
  constructor (top) {
    let image = Pie.getImage('pie_d')
    super(image, top)
  }

  draw () {
    let gap = window['canvas'].height / 5
    this.y = this.top + gap
    super.draw()
  }
}
