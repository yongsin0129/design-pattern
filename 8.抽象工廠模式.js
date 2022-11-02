/********************************************************************************
*
抽象工廠模式（Abstract Factory Pattern）
是圍繞一個超級工廠建立其他工廠。
該超級工廠又稱為其他工廠的工廠。
這種類型的設計模式屬於建立型模式，它提供了一種建立對象的最佳方式。

在抽象工廠模式中，介面是負責建立一個相關對象的工廠，不需要顯式指定它們的類。
每個生成的工廠都能按照工廠模式提供對象。
*
*********************************************************************************/

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
      throw new Error('沒有這個工廠')
      break
  }
}
const factory = userProducer('teacher')
const t = factory('王花花', '特級')
console.log(t)
