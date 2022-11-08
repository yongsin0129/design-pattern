class Panel {
  constructor (stock, overviewSelector, typeListSelector) {
    this.stock = stock
    this.overview = document.querySelector(overviewSelector)
    this.typeList = document.querySelector(typeListSelector)
  }

  render () {
    this.renderOverview()
    this.renderTypes()
  }

  renderOverview () {
    const stock = this.stock

    this.overview.innerHTML = `
    <div class="card">
        <div class="title">概覽</div>
        <div class="row">
          <dl class="even">
            <dt>貨物總數</dt>
            <dd>${stock.getTotal()}</dd>
          </dl>
          <dl class="even">
            <dt>貨物價值</dt>
            <dd>${stock.getSum()}</dd>
          </dl>
          <dl class="even">
            <dt>貨物類型</dt>
            <dd>${stock.getTotalTypes()}</dd>
          </dl>
        </div>
      </div>
    `
  }

  renderTypes () {
    const types = this.stock.types

    for (const type in types) {
      const it = types[type]
      // 第一種 render 法
      const el = document.createElement('div')
      el.classList.add('even')
      el.innerHTML = `<div class="card">
        <div class="title">${type}</div>
        <dl>
          <dt>總數</dt>
          <dd>${it.count}</dd>
        </dl>
        <dl>
          <dt>總價</dt>
          <dd>${it.sum}</dd>
        </dl>
      </div>
      `

      this.typeList.appendChild(el)

      // 第二種 render 法
      this.typeList.innerHTML += `
      <div class="even">
        <div class="card">
          <div class="title">${type}</div>
          <dl>
            <dt>總數</dt>
            <dd>${it.count}</dd>
          </dl>
          <dl>
            <dt>總價</dt>
            <dd>${it.sum}</dd>
          </dl>
        </div>
      </div>
      `
    }
  }
}

/**
 * 倉庫
 */
class Stock {
  constructor () {
    if (Stock.instance) return Stock.instance
    else Stock.instance = this

    this.sum = 0
    this.list = []
    this.maxId = 0
    this.types = {
      // phone: {
      //  count: 2,
      //  sum: 400
      // },
      // computer: {},
    }
  }

  /**
   * 入庫
   * @param {Product} product
   */
  input (product) {
    product.id = this.generateId()
    this.sum += product.price
    this.list.push(product)
    this.updateTypes(product.type, 1, product.price)
  }

  /**
   * 出庫
   * @param {number} id
   * @return {boolean}
   */
  output (id) {
    // 通過id找索引
    const index = this.list.findIndex(it => {
      return it.id === id
    })

    if (index === -1) return false

    const product = this.list[index]

    // 減去總價
    this.sum -= product.price
    // 刪除產品
    this.list.splice(index, 1)
    this.updateTypes(product.type, -1, product.price)
  }

  /**
   * 更新貨物類型統計
   * @param type
   * @param num 新增數量
   * @param price 價格
   */
  updateTypes (type, num, price) {
    let select = this.types[type]

    if (!select) select = this.types[type] = { count: 0, sum: 0 }

    select.count += num
    select.sum += price * num
  }

  /**
   * 獲取商品總價
   * @return {number}
   */
  getSum () {
    return this.sum
  }

  /**
   * 獲取商品總數
   * @return {number}
   */
  getTotal () {
    return this.list.length
  }

  /**
   * 獲取商品類型總數
   * @return {number}
   */
  getTotalTypes () {
    return Object.keys(this.types).length
  }

  /**
   * 生成id
   * @return {number}
   */
  generateId () {
    return ++this.maxId
  }

  /**
   * 獲取所有商品
   * @return {Array}
   */
  all () {
    return this.list
  }
}

/**
 * 產品
 */
class Product {
  constructor (type, price) {
    this.type = type
    this.price = price
  }
}

/********************************************************************************
*
          倉儲系統運作
*
*********************************************************************************/
const p1 = new Product('phone', 100)
const p2 = new Product('phone', 200)
const p3 = new Product('phone', 300)
const c1 = new Product('computer', 300)
const o1 = new Product('oven', 500)

const stock = new Stock()

stock.input(p1)
stock.input(p2)
stock.input(p3)
stock.input(c1)
stock.input(o1)
stock.output(2)

const panel = new Panel(stock, '#overview', '#type-list')
panel.render()
