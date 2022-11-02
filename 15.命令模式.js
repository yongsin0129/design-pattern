/********************************************************************************
*
命令模式（Command Pattern）是一種資料驅動的設計模式，它屬於行為型模式。

請求以命令的形式包裹在物件中，並傳給呼叫對象。
呼叫對象尋找可以處理該命令的合適的對象，並把該命令傳給相應的對象，該對象執行命令。
*
*********************************************************************************/

class Teacher {
  constructor () {
    this.fullAttendance = true
  }
}

class LeaveCommand {
  constructor (teacher) {
    this.teacher = teacher
  }

  do () {
    this.teacher.fullAttendance = false

    console.log('請假成功')
    console.log('重新安排課程...')
    // ...
  }

  undo () {
    this.teacher.fullAttendance = true

    console.log('撤銷請假')
    console.log('恢復課程...')
    // ...
  }
}

const whh = new Teacher()
const leave = new LeaveCommand(whh)

console.log(whh)

leave.do()
console.log(whh)

leave.undo()
console.log(whh)
