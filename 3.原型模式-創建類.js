function Student (name, gender, score) {
  this.name = name
  this.gender = gender
  this.score = score
  this.quality = 100
}

// 原型鏈
Student.prototype.sumScore = function () {
  return this.score + this.quality
}

const whh = new Student('王花花', '男', 89)
const lsd = new Student('李拴蛋', '女', 40)

console.log(whh.name, whh.sumScore())
console.log(lsd.name, lsd.sumScore())
