/**
 * 時間線
 */
class Timeline {
  /**
   * @param {string} selector 時間線應該插到頁面中的哪個位置
   * @param {Array} list
   */
  constructor (selector, list) {
    this.el = document.querySelector(selector)

    // 原始資料
    this.$raw = list

    // 轉換為Post實例的資料
    this.$list = []

    // 將所有this.$raw元素轉換為Post實例
    this.normalize()

    // 開始渲染
    this.render()
  }

  /**
   * 常規化
   */
  normalize () {
    // 清空上一次轉換的資料
    this.$list = []

    // 循環原始資料
    this.$raw.forEach(it => {
      // 通過帖子的類型動態獲取對應的Post類（TextPost還是ImagePost）
      const SelectedPost = postProducer(it.type)

      // 將實例化的帖子推入this.$list中
      this.$list.push(new SelectedPost(it))
    })
  }

  /**
   * 渲染時間線
   */
  render () {
    // 循環每一條帖子並追加到時間線上
    this.$list.forEach(it => {
      this.el.appendChild(it.render())
    })
  }
}

/**
 * 帖子
 */
class Post {
  /**
   * @param {Object} data 如：{type: 'text', content: 'xxx', ...}
   */
  constructor (data) {
    this.$raw = data
    this.el = null
  }

  /**
   * 渲染自己
   * @return {HTMLElement} 渲染好的自己
   */
  render () {
    // 建立容器
    this.el = document.createElement('div')

    // 快取資料
    const raw = this.$raw

    // 填充內容
    this.el.innerHTML = `
    <div class="post ${raw.type}">
        <div class="header"><strong>${raw.user}</strong></div>
        <div class="body"></div>
        <div class="footer">
          <small>發佈於 ${raw.createdAt}</small>
        </div>
      </div>
    `

    // 快取.body，方便後續呼叫
    this.body = this.el.querySelector('.body')

    return this.el
  }
}

/**
 * 文字類帖子
 */
class TextPost extends Post {
  /**
   * 渲染自己
   * @return {null}
   */
  render () {
    // 當父級渲染好框架後
    super.render()

    // 個性化渲染文字內容
    this.body.innerHTML = this.$raw.content
    return this.el
  }
}

/**
 * 圖片類帖子
 */
class ImagePost extends Post {
  /**
   * 渲染自己
   * @return {null}
   */
  render () {
    // 當父級渲染好框架後
    super.render()

    // 個性化渲染圖片內容
    let imageList = ''
    this.$raw.content.forEach(it => {
      imageList += `<img src="${it}">`
    })

    this.body.innerHTML = `
    <div class="title">${this.$raw.desc}</div>
    <div class="images">${imageList}</div>
    `

    this.body.addEventListener('click', e => {
      this.body.style.position = 'fixed'
      this.body.style.top = '0'
      this.body.style.left = '0'
      this.body.style.maxWidth = '200px'
    })
    return this.el
  }
}
/********************************************************************************
*
          抽象工廠的核心 :

          抽象工廠 return 一個 class or 直接工廠( return instance)
*
*********************************************************************************/
/**
 * 通過帖子類型動態返回對應的類
 * @param {string} type 如：'text|image'
 * @return {Post}
 */
function postProducer (type) {
  switch (type) {
    case 'text':
      return TextPost
    case 'image':
      return ImagePost
  }
}

/*
|--------------------------------------------------------------------------
| 業務邏輯
|--------------------------------------------------------------------------
*/

new Timeline('.timeline', [
  {
    type: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur',
    user: '李拴蛋',
    createdAt: '9:30'
  },
  {
    type: 'image',
    desc: '#關愛動物# 一隻凍僵的貓',
    content: [
      'https://public.biaoyansu.com/29.x/29.35/cat-frozened-to-death.jpg',
      'https://public.biaoyansu.com/29.x/29.35/cat-frozened-to-death.jpg',
      'https://public.biaoyansu.com/29.x/29.35/cat-frozened-to-death.jpg'
    ],
    user: '王花花',
    createdAt: '9:00'
  }
])
