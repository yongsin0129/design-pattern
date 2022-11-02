/********************************************************************************
*
在策略模式（Strategy Pattern）中，
一個類的行為或其演算法可以在執行階段更改。
這種類型的設計模式屬於行為型模式。

在策略模式中，
我們建立表示各種策略的對象和一個行為隨著策略對象改變而改變的 context 對象。
策略對象改變 context 對象的執行演算法。
*
*********************************************************************************/

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

/********************************************************************************
*
          main
*
*********************************************************************************/
const order = new Order()
order.setPaidBy(new Cash())
console.log(order.calc())
