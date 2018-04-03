function FooPromise(executor) {
  const context = this
  context.status = 'pending'
  context.value = undefined
  context.reason = undefined

  function resolve(value) {
    if (context.status === 'pending') {
      context.status = 'fulfilled'
      context.value = value
    }
  }

  function reject(reason) {
    if (context.status === 'pending') {
      context.status = 'rejected'
      context.reason = reason
    }
  }

  executor(resolve, reject)
}

FooPromise.prototype.then = (onFulfilled, onRejected) => {
  const context = this
  if (context.status === 'fulfilled') {
    onFulfilled(context.value)
  }
  if (context.status === 'rejected') {
    onRejected(context.reason)
  }
}

export default FooPromise
