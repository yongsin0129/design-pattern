/********************************************************************************
*
          檢視部分開始
*
*********************************************************************************/
class UserForm {
  /**
   * @param {string} selector 對應的表單元素的選擇器
   * @param {Function} onSubmit 當表單提交時應該做什麼
   */
  constructor (selector, onSubmit) {
    // 選中並保存對應元素對象
    this.el = document.querySelector(selector)

    // 保存提交回呼函數
    this.onSubmit = onSubmit

    // 繫結初始必要事件
    this.bindEvents()
  }

  /**
   * 繫結初始必要事件
   */
  bindEvents () {
    // 繫結表單提交事件
    this.el.addEventListener('submit', e => {
      // 禁止默認行為，防止整頁刷新
      e.preventDefault()

      // 初始化資料
      const data = {}

      // 快取el，方便呼叫
      const el = this.el

      // 獲取表單中的每一項input的值
      data.name = el.querySelector('[name=name]').value
      data.gender = el.querySelector('[name=gender]').value
      data.score = el.querySelector('[name=score]').value
      data.quality = el.querySelector('[name=quality]').value

      // 觸發回呼函數，並將取到的資料回傳
      this.onSubmit(data)

      // 重設表單
      this.reset()
    })
  }

  /**
   * 重設表單
   */
  reset () {
    this.el.reset()
  }
}

class UserTable {
  /**
   *
   * @param {UserList} list
   */
  constructor (selector, list) {
    this.el = document.querySelector(selector)
    this.$list = list
    this.render()
  }

  render () {
    this.$list.all().forEach(user => {
      const row = new UserRow(user)
      const tr = row.render()
      this.el.appendChild(tr)
    })
  }
}

class UserRow {
  /**
   * @param {User} user
   */
  constructor (user) {
    this.$user = user
  }

  render () {
    const user = this.$user
    const tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${user.name}</td>
    <td>${user.gender}</td>
    <td>${user.score}</td>
    <td>${user.quality}</td>
    `
    return tr
  }
}
// 檢視部分結束

// 資料部分開始
/**
 * @param {string} name 名稱
 * @param {string} gender 性別
 * @param {number} score 文化分
 * @param {number} quality 平時分
 */
class User {
  constructor (name, gender, score = 100, quality = 100) {
    this.name = name
    this.gender = gender
    this.score = score
    this.quality = quality
  }
}

class UserList {
  /**
   * @param {Array} list 使用者列表
   */
  constructor (list = []) {
    this.list = list
    this.normalize()
  }

  /**
   * 常規化
   *
   * 將this.list中不是User實例的對象轉換成User實例
   */
  normalize () {
    this.list.forEach((user, i) => {
      if (user instanceof User) return

      this.list[i] = new User(user.name, user.gender, user.score, user.quality)
    })
  }

  /**
   * 新增使用者
   * @param {User} user
   */
  add (user) {
    this.list.push(user)
    this.normalize()
  }

  /**
   * 刪除一個使用者
   * @param {number} id
   */
  remove (id) {
    this.list.splice(id, 1)
  }

  /**
   * 獲取所有使用者
   * @return {Array}
   */
  all () {
    return this.list
  }
}

/* 資料部分結束 */

const userList = new UserList()
const userTable = new UserTable('table', userList)

new UserForm('form', data => {
  userList.add(data)
  userTable.render()
})
