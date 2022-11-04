/*
|--------------------------------------------------------------------------
| 檢視部分開始
|--------------------------------------------------------------------------
*/

class Tagger {
  /**
   * @param {string} selector
   */
  constructor (selector) {
    this.$list = []
    this.el = document.querySelector(selector)
    this.prepare()
    this.bindEvents()
  }

  /**
   * 繫結必要初始事件
   */
  bindEvents () {
    // 繫結表單提交事件
    this.form.addEventListener('submit', e => {
      e.preventDefault()
      const val = this.input.value
      this.addTag(val)
      this.form.reset()
      this.render()
    })
  }

  /**
   * 渲染所有標籤
   */
  render () {
    // 清空上次渲染的標籤
    this.tagList.innerHTML = ''

    // 循環標籤列表
    this.$list.forEach(tag => {
      // 創造標籤元素
      const el = document.createElement('div')

      // 指定類名tag
      el.classList.add('tag')

      // 如果是消極標籤就指定danger類
      if (tag.type === 'negative') el.classList.add('danger')

      // 指定標籤內容
      el.innerText = tag.text

      // 將造好的標籤新增到<div class="tag-list">中
      this.tagList.appendChild(el)
    })
  }

  /**
   * 新增Tag對象
   * @param text
   */
  addTag (text) {
    this.$list.push(factory(text))
  }

  /**
   * 準備標籤容器
   */
  prepare () {
    // 指定內容
    this.el.innerHTML = `
    <form class="tag-wrapper">
      <div class="tag-list"></div>
      <div class="tag-input">
        <input type="text" autofocus autocomplete="off">
      </div>
    </form>
    `

    // 將input, form, .tag-list公用，方便後續呼叫
    this.input = this.el.querySelector('input')
    this.form = this.el.querySelector('form')
    this.tagList = this.el.querySelector('.tag-list')
  }
}

/*
-------------------
資料部分開始
------------------
*/

/**
 * 標籤
 */
class Tag {
  /**
   * @param {string} text 標籤文字
   * @param {string} type 標籤類型
   */
  constructor (text, type) {
    this.text = text
    this.type = type
  }
}

/**
 * 用於生產標籤實例
 * @param text
 * @return {Tag}
 */
function factory (text) {
  let type

  if (text.startsWith('!')) {
    // 如果是消極標籤
    // 其類型就應該是'negative'
    type = 'negative'
    // 既然類型確定了，'!'就沒有意義了，應該去掉
    text = text.substring(1)
  } else {
    // 否則就是積極標籤
    type = 'positive'
  }

  // 返回標籤實例
  return new Tag(text, type)
}

/* 資料部分結束 */

new Tagger('#a')
new Tagger('#b')
