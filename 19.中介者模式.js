/********************************************************************************
*
中介者模式。

所謂中介，在我們生活中很是常見，我們買房子可以有中介公司，找兼職也可以有中介公司。
以買房子為例。中介者把所有的買房人、賣房人的需求和特點都結合到一起，把適合的房子提供給合適的人。

首先我們要理解中介者模式的定義：
用一個中介者對象來封裝一系列對象的互動。
中介者使得各對象不需要顯式地相互引用，從而解耦合，獨立改變他們之間的互動。

__________________________________________

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
