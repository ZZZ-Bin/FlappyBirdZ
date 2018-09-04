// audio 播放控制类
export default function audioPlayer (src, isLoop, isAuto) {
  let player = wx.createInnerAudioContext()
  player.src = src
  player.loop = isLoop
  player.autoplay = isAuto
  player.play()
}
