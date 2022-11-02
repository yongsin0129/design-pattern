/********************************************************************************
*
責任鏈模式（Chain of Responsibility Pattern）
為請求建立了一個接收者對象的鏈。
這種模式給予請求的類型，對請求的傳送者和接收者進行解耦。這種類型的設計模式屬於行為型模式。

在這種模式中，通常每個接收者都包含對另一個接收者的引用。
如果一個對象不能處理該請求，那麼它會把相同的請求傳給下一個接收者，依此類推。
*
*********************************************************************************/

/**
 * 支付方案
 * @param balance 餘額
 * @constructor
 */
class Payment {
  constructor (name, balance) {
    this.name = name
    this.balance = balance
    this.next = null
  }

  /**
   * 設定下一個責任節點（下一個工位）
   * @param {Payment} payment
   * @return {*}
   */
  setNext (payment) {
    return (this.next = payment)
  }

  /**
   * 是否可以支付
   * @param {number} amount
   * @return {boolean}
   */
  canPay (amount) {
    return this.balance >= amount
  }

  /**
   * 支付
   * @param {number} amount 支付的數額
   * @return {boolean}
   */
  pay (amount) {
    // 如果餘額不足
    if (!this.canPay(amount)) {
      console.log(`餘額不足 ， ${this.name} 的餘額為 : ${this.balance} `)

      // 如果沒有下一個支付方式，直接返回false
      if (!this.next) return false

      // 如果有下一個支付方式，就執行並返回執行結果
      return this.next.pay(amount)
    }

    // 如果餘額充足就減去消費數額
    this.balance -= amount
    console.log(`支付 ${amount} 成功 ， ${this.name} 的餘額為 : ${this.balance} `)
  }
}

const subvention = new Payment('subvention', 20)
const scholarship = new Payment('scholarship', 10)
const recharged = new Payment('recharged', 50)

const amount = 30

subvention.setNext(scholarship).setNext(recharged)
subvention.pay(amount)
