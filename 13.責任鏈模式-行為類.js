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
