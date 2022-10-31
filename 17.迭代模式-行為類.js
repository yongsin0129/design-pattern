class Student {
  constructor (termId) {
    this.termId = termId
  }
}

class StudentList {
  constructor () {
    this.list = []
  }

  add (student) {
    this.list.push(student)
  }

  removeByTerm (termId) {
    this.list = this.list.filter(function (student) {
      return student.termId !== termId
    })
  }
}

const list = new StudentList()
list.add(new Student(1))
list.add(new Student(1))
list.add(new Student(2))
list.add(new Student(2))
console.log(list)

list.removeByTerm(2)
console.log(list)

/********************************************************************************
*
疊代器模式是一種設計模式，是一種最簡單也最常見的設計模式。
它可以讓使用者透過特定的介面巡訪容器中的每一個元素而不用了解底層的實作。
此外，也可以實作特定目的版本的疊代器
*
*********************************************************************************/
