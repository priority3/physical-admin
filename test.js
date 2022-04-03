function outer() {
  const inner = function() {
    const obj = {}
    obj.arrow = () => {
      console.log(this)
    }
    return obj
  }
  return inner
}
const a = outer().bind(outer)()
const b = outer.bind(outer)()()
a.arrow()
b.arrow()

