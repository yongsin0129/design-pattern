class Teacher {
  constructor (lessonPlan) {
    this.fullAttendance = true
    this.lessonPlan = lessonPlan
    this.absentPlan = [[], [], [], [], []]
    this.additionalPlan = [[], [], [], [], []]
  }
}

class ReassignTeacherCommand {
  constructor (t1, t2, day) {
    this.t1 = t1
    this.t2 = t2
    this.day = day
  }
  do () {
    this.t2.additionalPlan[this.day] = this.t1.absentPlan[this.day] = this.t1.lessonPlan[this.day]
  }
  undo () {
    this.t1.absentPlan[this.day] = []
    this.t2.additionalPlan[this.day] = []
  }
}

class LeaveCommand {
  constructor (teacher, replacer, day) {
    this.teacher = teacher
    this.reassign = null
    this.replacer = replacer
    this.day = day
  }
  do () {
    this.teacher.fullAttendance = false

    console.log('請假成功')
    this.reassign = new ReassignTeacherCommand(
      this.teacher,
      this.replacer,
      this.day
    )
    this.reassign.do()
  }
  undo () {
    this.teacher.fullAttendance = true

    console.log('撤銷請假')
    this.reassign.undo()
  }
}



var whhPlan = [['09:30'], ['09:30', '14:30'], [], [], ['15:00']]
var lsdPlan = [['09:30'], [], [], [], ['15:00']]

var whh = new Teacher(whhPlan)
var lsd = new Teacher(lsdPlan)
var leave = new LeaveCommand(whh, lsd, 1)

leave.do()

console.log('whh:', whh)
console.log('lsd:', lsd)

leave.undo()

console.log('whh:', whh)
console.log('lsd:', lsd)
