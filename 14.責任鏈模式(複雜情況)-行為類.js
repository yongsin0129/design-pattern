class Payment {
  /**
   * 支付方案
   * @param balance 餘額
   * @constructor
   */
  constructor (balance) {
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
    // 更改前的餘額
    const oldBalance = this.balance

    // 先將數額減去
    this.balance -= amount

    // 如果當前帳戶餘額不足，就嘗試下一個帳戶
    if (this.balance < 0) {
      // 如果下一個帳戶存在且支付成功（餘額充足） recursion
      if (this.next && this.next.pay(-this.balance)) {
        // 清空當前帳號餘額
        this.balance = 0
      } else {
        // 由於下一個帳號支付失敗，還原當前帳號餘額
        this.balance = oldBalance
        return false
      }
    }

    // 能執行到這一步就說明一切正常，支付成功
    return true
  }
}

const amount = 2
const a = new Payment(1)
const b = new Payment(2)
const c = new Payment(3)

a.setNext(b).setNext(c)

const result = a.pay(amount)

console.log(result)
console.log(a.balance, b.balance, c.balance)
