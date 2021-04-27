// function Demo () {}
//
// Demo.prototype.send = function (line) {
//   this.onmessage && this.onmessage(line)
// }
//
// Demo.prototype.onmessage = null
//
// const demo = new Demo()
// const callback = (cb) => {
//   demo.onmessage = cb
// }
//
// callback(console.log)
// console.log(demo)
// demo.send('Hello')

const listeners = []
const makeListener = (fn) => listeners.push(fn)

function useRandom() {
  const publish = (value) => {
    listeners.forEach(listener => {
      listener(value)
    })
  }
  const listener = (callback) => {
    makeListener(callback)
  }

  setTimeout(() => {
    publish('hello')
  }, 5000)

  return [{ id: 'stockfish' }, listener]
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const [stockfish, listener] = useRandom()

listener((move) => {
  console.log(move)
})
