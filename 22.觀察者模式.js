/********************************************************************************
*
當對象間存在一對多關係時，則使用觀察者模式（Observer Pattern）。

多個物件之間存在著一對多的依賴關係，當一個物件發生改變時，所有跟他有關的物件都會被通知且更新。
*
*********************************************************************************/

class User {
  notify (msg) {
    console.log('新消息：' + msg)
  }
}

class Department {
  constructor () {
    this.subs = []
  }

  subscribe (user) {
    this.subs.push(user)
  }

  newMessage (msg) {
    this.subs.forEach(user => {
      user.notify(msg)
    })
  }
}

const a = new Department()
const a1 = new User()
const a2 = new User()
const a3 = new User()

const b = new Department()
const b1 = new User()
const b2 = new User()

const ab1 = new User()

a.subscribe(a1)
a.subscribe(a2)
a.subscribe(a3)
a.subscribe(ab1)
a.newMessage('Yo, from a.')

b.subscribe(b1)
b.subscribe(b2)
b.subscribe(ab1)
b.newMessage('Yo, from b.')
