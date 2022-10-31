class Music {
  constructor (name, hot) {
    this.name = name
    this.hot = hot
  }

  play () {
    console.log(this.name + ' 播放中...')
  }
}

class MusicList {
  constructor () {
    this.list = []
    this.current = 0
  }

  add (music) {
    this.list.push(music)
  }

  next (music) {
    return this.list[++this.current]
  }

  prev (music) {
    return this.list[--this.current]
  }

  onlyHot () {
    return this.list.filter(music => music.hot)
  }
}

const musicList = new MusicList()
musicList.add(new Music('阿花爱上了阿蛋', true))
musicList.add(new Music('我的滑板孩', true))
musicList.add(new Music('爱', false))

// console.log(musicList.onlyHot())

console.log(musicList.next().play())
// console.log(musicList.prev())
// console.log(musicList.next())

/********************************************************************************
*
疊代器模式是一種設計模式，是一種最簡單也最常見的設計模式。
它可以讓使用者透過特定的介面巡訪容器中的每一個元素而不用了解底層的實作。
此外，也可以實作特定目的版本的疊代器
*
*********************************************************************************/
