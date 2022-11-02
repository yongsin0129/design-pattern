/********************************************************************************
*
          ES5
*
*********************************************************************************/
// function Student (name, gender, score) {
//   this.name = name
//   this.gender = gender
//   this.score = score
//   this.quality = 100

//   this.sumScore = function () {
//     return this.score + this.quality
//   }
// }

// var whh = new Student('王花花', '男', 89)
// var lsd = new Student('李拴蛋', '女', 40)

// console.log(whh.name, whh.sumScore())
// console.log(lsd.name, lsd.sumScore())

/********************************************************************************
*
          ES6
*
*********************************************************************************/
class Student {
  constructor (name, gender, score) {
    this.name = name
    this.gender = gender
    this.score = score
    this.quality = 100
  }

  sumScore () {
    return this.score + this.quality
  }
}

const whh = new Student('王花花', '男', 89)
const lsd = new Student('李拴蛋', '女', 40)

whh.score = 100
console.log(whh.name, whh.sumScore()) // 王花花 200
console.log(lsd.name, lsd.sumScore()) // 李拴蛋 140
