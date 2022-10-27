class Order {
  constructor () {
    // 未優惠前的價格
    this.originalPrice = 10

    // 支付方式
    this.paidBy = null
  }

  /**
   * 設定支付方式
   * @param paidBy 策略實例
   */
  setPaidBy (paidBy) {
    this.paidBy = paidBy
  }

  /**
   * 計算最終付款價格
   * @return {number}
   */
  calc () {
    return this.paidBy.calc(this.originalPrice)
  }
}

/**
 * 學生卡策略
 * @constructor
 */
class StudentCard {
  calc (total) {
    return total
  }
}

/**
 * 教師卡策略
 * @constructor
 */
class TeacherCard {
  calc (total) {
    return total * 0.9
  }
}

/**
 * 現金策略
 * @constructor
 */
class Cash {
  calc (total) {
    return total * 1.1
  }
}

const order = new Order()
order.setPaidBy(new Cash())
console.log(order.calc())
