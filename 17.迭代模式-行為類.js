/********************************************************************************
*
疊代器模式是一種最簡單也最常見的設計模式。

提供一種方法可以順序性讀取一個集合物件中的各個元素，而又不會暴露該物件的內部表示。
(它可以讓使用者透過特定的介面巡訪容器中的每一個元素而不用了解底層的實作。)

迭代器模式將集合對象的遍歷行為分離出來，
讓抽象迭代器類別來實作。
他的目的在於不暴露集合內部物件的內部結構，讓外部可以呼叫集合的內部數據。
如 Java 中的 Collection、List、Set、Map 等都包含了迭代器。
*
*********************************************************************************/

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


