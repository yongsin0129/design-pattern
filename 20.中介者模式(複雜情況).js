class Bike {
  go (dest) {
    console.log('正在前往' + dest)
  }
}

class User {
  constructor (balance) {
    this.balance = balance
  }
}

class BikeManger {
  send (user, dest) {
    if (user.balance < 10) throw new Error('餘額不足')

    if (dest !== '六六坡' && dest !== '背背山') throw new Error(dest + '暫無存車點')

    const bike = new Bike()
    bike.go(dest)
  }
}

const whh = new User(8)
const manger = new BikeManger()
manger.send(whh, '六六山')
