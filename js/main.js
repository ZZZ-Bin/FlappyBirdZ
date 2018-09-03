import ResourcesLoader from './base/ResourcesLoader.js'
import DataStore from './base/DataStore.js'
import Director from './runtime/Director.js'
import Background from './runtime/Background.js'
import Land from './runtime/Land.js'
import Bird from './player/Bird.js'
import StartButton from './player/StartButton.js'
import Score from './player/Score.js'

export default class Main {
  constructor () {
    this.dataStore = DataStore.getInstance()
    this.director = Director.getInstance()
    // 加载器实例
    const loader = ResourcesLoader.create()
    loader.loaded
      .then(resMap => this.onResFirstLoaded(resMap))
      .catch((e) => {
        throw e
        ctx.fillStyle = 'red'
        ctx.textAlign = 'center'
        ctx.font = '40px bold'
        ctx.fillText(e.toString().split(' ')[1], window['canvas'].width / 2, window['canvas'].height / 2)
      })
  }
  // 资源首次加载方法
  onResFirstLoaded (resMap) {
    this.dataStore.resMap = resMap

    this.init()
  }
  // 注册事件
  registerEvent () {
    wx.onTouchStart ((e) => {
      this.director.birdEvent()
      if (this.director.isOver() && StartButton.onButton(e, this.dataStore.get('startButton'))) {
        this.init()
      }
    })
  }

  // 初始化方法
  init () {
    // 将实例放入 Datastore 中
    this.dataStore
      .set('pies', [])
      .set('bg', Background)
      .set('land', Land)
      .set('birds', Bird)
      .set('startButton', StartButton)
      .set('score', Score)
    this.director.createPie()
    this.director.score = 0
    this.registerEvent()
    this.director.run()
  }
}
