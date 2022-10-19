let studentCount = 0

// 實際需要的物件
class Student {}

class StudentBuilder {
  constructor () {
    // 實際需要的 物件 先存在 class 的屬性內，不要對外暴露
    // 等呼叫 build , 才會 return 這個物件
    this.student = new Student()
  }

  setName (name) {
    this.student.name = name
  }

  setGender (gender) {
    if (gender != '男' && gender != '女') throw '不男不女不可以'

    this.student.gender = gender
  }

  setHairLength (hairLength) {
    if (
      (this.student.gender == '男' && hairLength > 1) ||
      (this.student.gender == '女' && hairLength > 25)
    )
      throw '回去剪頭髪'

    this.student.hairLength = hairLength
  }

  build () {
    studentCount++
    console.log(`現在學生數量 : ${studentCount} 位`)
    return this.student
  }
}

// 需要 student , 所以叫 studentBuilder ，另外物件也需要從 builder 中 build() 才會出現 !
const builder = new StudentBuilder()
builder.setName('王花花')
builder.setGender('男')
builder.setHairLength(1)
const whh = builder.build()

const builder2 = new StudentBuilder()
builder2.setName('李全')
builder2.setGender('女')
builder2.setHairLength(20)
const lsd = builder2.build()

console.log(lsd)
