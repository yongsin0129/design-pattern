/*
|--------------------------------------------------------------------------
| 檢視部分
|--------------------------------------------------------------------------
*/

class UserForm {
  /**
   * @param {string} selector 表單選擇器
   * @param {string} errorSelector 錯誤資訊容器的選擇器
   */
  constructor (selector, errorSelector = '.error') {
    // 選中公用元素
    this.el = document.querySelector(selector)
    this.elError = this.el.querySelector(errorSelector)
    // 繫結必要的初始事件
    this.bindEvents()
  }

  reset () {
    this.el.reset()
  }

  bindEvents () {
    this.bindSubmit()
    this.bindInput()
  }

  bindInput () {
    const form = this.el
    form.addEventListener('keyup', e => {
      if (e.key == 'Enter') return

      this.elError.hidden = true
    })
  }

  bindSubmit () {
    const form = this.el
    const q = form.querySelector.bind(form)

    this.el.addEventListener('submit', e => {
      e.preventDefault()
      const name = q('[name=name]').value
      const gender = q('[name=gender]').value
      const score = q('[name=score]').value
      const quality = q('[name=quality]').value

      const builder = new Builder()

      try {
        builder.setName(name)
        builder.setGender(gender)
        builder.setScore(score)
        builder.setQuality(quality)
      } catch (e) {
        const error = this.elError
        error.hidden = false
        error.innerHTML = e
        return
      }

      console.log(builder.build())
      this.reset()
    })
  }
}

/*
|--------------------------------------------------------------------------
| 資料部分
|--------------------------------------------------------------------------
*/

class User {}

class Builder {
  constructor () {
    this.instance = new User()
  }

  setName (name) {
    const maxLength = 10
    if (!name) throw '姓名不可為空'

    if (name.length > maxLength) throw `姓名長度不可大於${maxLength}`

    this.instance.name = name
    return this
  }

  setGender (gender) {
    const genderSet = ['男', '女']

    if (genderSet.indexOf(gender) < 0) throw '別鬧，不合法的性別'

    this.instance.gender = gender
    return this
  }

  setScore (score) {
    if (!this.validNumber(score)) throw '別鬧，文化分應該是阿拉伯數字'

    this.instance.score = parseFloat(score)
    return this
  }

  setQuality (quality) {
    if (!this.validNumber(quality)) throw '別鬧，平時分應該是阿拉伯數字'

    this.instance.quality = parseFloat(quality)
    return this
  }

  validNumber (val) {
    return val === 0 || parseFloat(val)
  }

  build () {
    return this.instance
  }
}

/*
|--------------------------------------------------------------------------
| 業務邏輯
|--------------------------------------------------------------------------
| description
*/

new UserForm('form')
