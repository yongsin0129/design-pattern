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

var whh = new Teacher()
var leave = new LeaveCommand(whh)

console.log(whh)

leave.do()
console.log(whh)

leave.undo()
console.log(whh)
