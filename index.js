var fn1 = () => {
    console.log('fn1')
    return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

async function promiseReduce(asyncFunctions, reduce, initialValue) {
    let value = initialValue

    for (let i = 0; i < asyncFunctions.length; i++) {
        const result = await asyncFunctions[i]()
        value = reduce(value, result)
    }

    return Promise.resolve(value)
}

promiseReduce(
    [fn1, fn2],
    function (memo, value) {
        console.log('reduce')
        return memo * value
    },
    1
)
    .then(console.log)