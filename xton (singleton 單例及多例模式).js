class Anton {
  // 寫在 constructor 外面會先讓 this 吃到這個屬性
  instances = {}
  constructor (Ton, parameters) {
    this.Ton = Ton
    this.parameters = parameters
    // 如果將 this.instances = {} 寫在這邊會等到上一行的屬性賦值後， this 才有這個屬性
    // 可以自行判斷需要用那一種方式
  }

  // 可以自定義物件的名字 name : string
  create_instance = function (name) {
    if (this.instances[name] === undefined) {
      this.instances[name] = new this.Ton(...this.parameters) // No pun intended.
    }

    return this.instances[name]
  }
}

class dummyClass1 {
  constructor (id, name) {
    this.id = id
    this.name = name
  }
}

class dummyClass2 {
  constructor () {
    this.name = 'dummyName2'
  }
}

/********************************************************************************
*
          測試單例模式
*
*********************************************************************************/
// const FirstClassOf1 = new Anton(dummyClass1, [])

// const A = FirstClassOf1.create_instance()
// const B = FirstClassOf1.create_instance()
// console.log('A', A)
// console.log('B', B)
// console.log(A === B)

/********************************************************************************
*
          測試多例模式，可用 create_instance('foo') 創造獨一無二的物件並可全域調用
*
*********************************************************************************/
const FirstClassOf1 = new Anton(dummyClass1, [211829, 'YongSin'])

const A = FirstClassOf1.create_instance('A')
const B = FirstClassOf1.create_instance('A')
const C = FirstClassOf1.create_instance('B')
const D = FirstClassOf1.create_instance('B')
console.log('A', A)
console.log('B', B)
console.log('C', C)
console.log(A === B)
console.log(A === C)
console.log(B === C)
console.log(C === D)
A.id = 12345678
C.id = 98765432

module.exports = FirstClassOf1
// 可以在別的作用域調用 FirstClassOf1.create_instance('A') 跟 B 比較看看 id 的值
