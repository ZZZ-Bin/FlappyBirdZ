// audio 播放控制类
export default function audioPlayer (src, isLoop = false, isAuto = false) {
  let player = wx.createInnerAudioContext()
  player.src = src
  player.loop = isLoop
  player.autoplay = isAuto
  player.play()
  if (player.paused) {
    let currentTime = player.currentTime
    wx.onShow(() => {
      player.startTime = currentTime
      player.play()
    })
  }
}
