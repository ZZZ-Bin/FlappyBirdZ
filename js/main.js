import ResourcesLoader from './base/ResourcesLoader.js'
import DataStore from './base/DataStore.js'
import Director from './runtime/Director.js'
import Background from './runtime/Background.js'
import Land from './runtime/Land.js'
import Pie from './runtime/Pie.js'
import PieUp from './runtime/Pie_Up.js'
import PieDown from './runtime/Pie_Down.js'
import Bird from './player/Bird.js'
import StartButton from './player/StartButton.js'
import Score from './player/Score.js'
import audioPlayer from './runtime/audioPlayer.js'

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
    audioPlayer('res/audio/bgm.mp3', true, true)
    this.init()
  }
  // 注册事件
  registerEvent () {
    wx.onTouchStart ((e) => {
      Bird.birdEvent(this.dataStore)

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
      .set('audios', {bgm: 'res/audio/bgm.mp3', jump: 'res/audio/jump.mp3', knock: 'res/audio/knock.mp3', through: 'res/audio/through.mp3'})
    Pie.createPie(this.dataStore, PieUp, PieDown)
    this.director.score = 0
    this.registerEvent()
    this.director.run()
  }
}
