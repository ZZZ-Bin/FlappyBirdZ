// 导演类
// 绘制各实例 动画
// 控制游戏运行状态 isOver/!isOver

import DataStore from '../base/DataStore.js'
import Pie from '../runtime/Pie.js'
import PieUp from '../runtime/Pie_Up.js'
import PieDown from '../runtime/Pie_Down.js'
import audioPlayer from './audioPlayer.js'

export default class Director {
  constructor () {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = -2
    this.score = 0
    this.isAddScore = true
  }
  // 获取单例
  static getInstance () {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
  // 各种判断条件
  static Conditions (data) {
    // 小鸟边界模型
    let bird = data.get('birds')
    let birdBorder = {
      top: bird.y + 10,
      bottom: bird.y + bird.height - 15,
      left: bird.x + 13,
      right: bird.x + bird.width - 13
    }
    // 铅笔边界模型
    let pies = data.get('pies')
    let piesBorder = {
      left: pies[0].x,
      right: pies[0].x + pies[0].width,
      uBottom: pies[0].y + pies[0].height,
      dTop: pies[1].y
    }
    let land = data.get('land')
    // 返回条件对象
    return {
      conditionCeiling: birdBorder.top <= 0,
      conditionLand: birdBorder.bottom >= land.y,
      conditionPieU: birdBorder.right >= piesBorder.left && birdBorder.top <= piesBorder.uBottom,
      conditionPieD: birdBorder.right >= piesBorder.left && birdBorder.bottom >= piesBorder.dTop,
      conditionByond: birdBorder.left >= piesBorder.right
    }
  }

  // 是否结束游戏
  isOver () {
    let conditionCeiling = Director.Conditions(this.dataStore).conditionCeiling
    let conditionLand = Director.Conditions(this.dataStore).conditionLand
    let conditionPieU = Director.Conditions(this.dataStore).conditionPieU
    let conditionPieD = Director.Conditions(this.dataStore).conditionPieD
    let conditionByond = Director.Conditions(this.dataStore).conditionByond
    if ((conditionCeiling || conditionLand || conditionPieU || conditionPieD) && !conditionByond) {
      return true
    }
  }
  // 加分逻辑
  addScore () {
    let conditionByond = Director.Conditions(this.dataStore).conditionByond
    if (conditionByond && this.isAddScore) {
      this.score++
      this.isAddScore = false
      audioPlayer('res/audio/through.mp3')
    }
  }

  // Director 运行方法
  run () {
    if (!this.isOver()) {
      // 绘制背景
      this.dataStore.data.get('bg').draw()
      // 绘制铅笔
      let pies = this.dataStore.data.get('pies')
      //  越界清除
      if (pies[0].x <= -pies[0].width) {
        this.isAddScore = true
        pies.shift()
        pies.shift()
      }
      //  第二组
      if (
        pies[0].x <= (window['canvas'].width - pies[0].width) / 2 &&
        pies.length === 2) {
        Pie.createPie(this.dataStore, PieUp, PieDown)
      }
      //  根据数组绘制铅笔
      pies.forEach(item => {
        item.draw()
      })
      // 绘制陆地
      this.dataStore.data.get('land').draw()
      // 绘制小鸟
      this.dataStore.data.get('birds').draw()
      // 绘制分数
      this.addScore()
      this.dataStore.data.get('score').draw(this.score)

      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.data.set('timer', timer)
    } else {
      audioPlayer('res/audio/knock.mp3')
      wx.vibrateLong()
      this.dataStore.get('startButton').draw();
      cancelAnimationFrame(this.dataStore.get('timer'));
      this.dataStore.destroy();
      // 触发微信小游戏垃圾回收
      wx.triggerGC();
    }
  }
}
