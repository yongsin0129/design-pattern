/********************************************************************************
*
          中介者模式、代理模式和外观模式的Pk
          學習設計模式的時候，發現這三個模式在一定程度上很是相似。所以總結一下，加以區分。
          https://blog.csdn.net/mengmei16/article/details/43981791
*
*********************************************************************************/

class Member {
  constructor () {}

  receive (from, msg) {
    console.log(msg)
  }
}

class ChatManager {
  constructor () {
    this.log = []
  }

  send (from, to, msg) {
    this.log.push({ to, from, msg })
    to.receive(from, msg)

    console.log(this.log.length)
  }
}

const chatManger = new ChatManager()

const zks = new Member()
const whh = new Member()
const lsd = new Member()

chatManger.send(zks, lsd, '蛋蛋早')
chatManger.send(lsd, zks, '哦')

chatManger.send(lsd, whh, '花花，今晚月色正好')
chatManger.send(whh, lsd, '哦')
