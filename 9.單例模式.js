class Resource {
  constructor () {
    // 如果不是第一次new（instance肯定是存在的）
    if (Resource.instance) return Resource.instance
    else {
      // 否則（instance不存在） => 創建新對象
      this.balance = 100

      // 存到 instance 屬性上
      Resource.instance = this
    }
  }
}

const r = new Resource()
console.log('r:', r)
r.balance = 50
console.log('r:', r)

const r2 = new Resource()
console.log('r2:', r2)
r.balance = 55
console.log('r2:', r2)
console.log('r:', r)
