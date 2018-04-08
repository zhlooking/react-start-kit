function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(TypeError('Cycle Reference!'))
    return
  }
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 可能是promise {},看这个对象中是否有then方法，如果有then我就认为他是promise了
    try {
      const { then } = x // 保存一下x的then方法
      if (typeof then === 'function') {
        // 成功
        // 这里的y也是官方规范，如果还是promise，可以当下一次的x使用
        // 用call方法修改指针为x，否则this指向window
        then.call(x, y => {
          if (called) return // 如果调用过就return掉
          called = true // y可能还是一个promise，在去解析直到返回的是一个普通值
          resolvePromise(promise, y, resolve, reject) // 递归调用，解决了问题6
        }, (err) => { // 失败
          if (!called) {
            called = true
            reject(err)
          }
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (!called) {
        called = true
        reject(e)
      }
    }
  } else { // 说明是一个普通值1
    resolve(x) // 表示成功了
  }
}

function FooPromise(executor) {
  const context = this
  context.status = 'pending'
  context.value = undefined
  context.reason = undefined
  context.onRejectedCallbacks = []
  context.onResolvedCallbacks = []

  function resolve(value) {
    if (context.status === 'pending') {
      context.status = 'fulfilled'
      context.value = value
      context.onResolvedCallbacks.forEach(cb => {
        cb(context.value)
      })
    }
  }

  function reject(reason) {
    if (context.status === 'pending') {
      context.status = 'rejected'
      context.reason = reason
      context.onRejectedCallbacks.forEach(cb => {
        cb(context.reason)
      })
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

FooPromise.prototype.then = function then(onFulfilled, onRejected) {
  // eslint-disable-next-line
  onFulfilled =
    typeof onFulfilled === 'function' ? onFulfilled : value => value
  // eslint-disable-next-line
  onRejected =
    typeof onRejected === 'function' ? onRejected : error => { throw error }

  const context = this
  let resultPromise

  if (context.status === 'pending') {
    resultPromise = new Promise((resolve, reject) => {
      context.onResolvedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const r = onFulfilled(context.value)
            resolvePromise(resultPromise, r, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })

      context.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const r = onRejected(context.reason)
            resolvePromise(resultPromise, r, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  }

  if (context.status === 'fulfilled') {
    resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const r = onFulfilled(context.value)
          resolvePromise(resultPromise, r, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  if (context.status === 'rejected') {
    resultPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const r = onRejected(context.reason)
          resolvePromise(resultPromise, r, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  return resultPromise
}

FooPromise.prototype.catch = function (callback) {
  return this.then(null, callback)
}

FooPromise.all = function (promises) {
  return new FooPromise((resolve, reject) => {
    const results = []
    let successTimes = 0

    function processData(index, resolveValue) {
      successTimes += 1
      results[index] = resolveValue
      if (successTimes === promises.length) {
        resolve(results)
      }
    }

    promises.forEach(promise => {
      promise.then((resolveValue, index) => {
        processData(index, resolveValue)
      }, reject)
    })
  })
}

FooPromise.race = function (promises) {
  return new FooPromise((resolve, reject) => {
    promises.forEach(promise => {
      promise.then(resolve, reject)
    })
  })
}

FooPromise.resolve = function (value) {
  return new FooPromise(resolve => {
    resolve(value)
  })
}

FooPromise.reject = function (reason) {
  return new FooPromise((resolve, reject) => {
    reject(reason)
  })
}

FooPromise.deferred = function () {
  const dfd = {}
  dfd.promise = new FooPromise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

export default FooPromise
