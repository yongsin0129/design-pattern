function Student () {
  this.intro = '我是個學生'
}

function Teacher () {
  this.intro = '我是個老師'
}

/**
 * 生產學生
 * @param {string} factory
 */
function studentFactory () {
  return new Student()
}

/**
 * 生產老師
 * @param {string} factory
 */
function teacherFactory () {
  return new Teacher()
}

/**
 * 選擇工廠
 * @param {string} factory
 */
function userProducer (factory) {
  // 判斷工廠類型
  switch (factory) {
    case 'student':
      return studentFactory
      break
    case 'teacher':
      return teacherFactory
      break
    default:
      throw '沒有這個工廠'
      break
  }
}

var factory = userProducer('teacher')
var t = factory('王花花', '特級')
console.log(t)
