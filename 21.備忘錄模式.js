/********************************************************************************
*
備忘錄模式（Memento Pattern）

保存一個對象的某個狀態，以便在適當的時候恢復對象。備忘錄模式屬於行為型模式
*
*********************************************************************************/

class Version {
  constructor (content) {
    this.content = content
  }
}

class Editor {
  constructor () {
    this.content = ''
    this.version = []
  }

  type (str) {
    this.content += str
  }

  getContent () {
    return this.content
  }

  save () {
    const saved = new Version(this.getContent())
    this.version.push(saved)
  }
}

const editor = new Editor()
editor.type('Yo, ')
editor.type('whh \n')
editor.save()
editor.type('Yo, ')
editor.type('lsd ')
editor.save()
console.log(editor.getContent())
console.log(editor.version)
