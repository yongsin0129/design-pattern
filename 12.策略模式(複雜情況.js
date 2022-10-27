// 策略模式的好處 : 情況增加的時候，只需要去相對應的 class 內修改邏輯即可
const teacherDay = false
const childrenDay = true
const workingDay = false

class Order {
  constructor () {
    this.originalPrice = 10
    this.paidBy = null
  }

  setPaidBy (paidBy) {
    this.paidBy = paidBy
  }

  calc () {
    return this.paidBy.calc(this.originalPrice)
  }
}

class StudentCard {
  calc (price) {
    if (childrenDay === true) return price * 0.8
    return price
  }
}

class TeacherCard {
  calc (price) {
    if (teacherDay === true) return price * 0.5
    return price * 0.9
  }
}

class Cash {
  calc (price) {
    if (workingDay === true) return price * 0.9
    return price * 1.1
  }
}

const order = new Order()
order.setPaidBy(new StudentCard())
console.log(order.calc())
