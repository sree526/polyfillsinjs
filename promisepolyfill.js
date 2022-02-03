class MyPromise {
    resolvedValue;
    promiseResolved = false;
    chainingpromises = [];
    allpromisesPassed = [];
    constructor(callbackExecutor) {
         const resolve = (value) =>{
            this.resolvedValue = value;
            this.promiseResolved = true;
            if(this.chainingpromises.length){
                this.chainingpromises.reduce((value, fn) => fn(value), this.resolvedValue)
            }
        }
        if(callbackExecutor) {
            callbackExecutor(resolve);
        }

    }
    then(fn) {
        this.chainingpromises.push(fn);
        if(this.promiseResolved) {
            this.chainingpromises.reduce((value, fn) => fn(value), this.resolvedValue)
        }
        return this;
    }
    all(promises) {
        return new MyPromise((resolve, reject) => {
            promises.forEach((promise,i) => {
                promise.then((value) => {
                    this.allpromisesPassed.push(value);
                    if(i === promises.length-1) {
                        resolve(this.allpromisesPassed)
                }
                });
            })
        })

    }
}
let promise = new MyPromise(function(resolve) {
    setTimeout(() => {
        resolve(1);
    }, 1000)

})
promise.then((val) =>  val*2).then((data)=> console.log(data));
const promise1 = new MyPromise((resolve) => {
    resolve(3)
});
const promise3 = new MyPromise((resolve) => {
    setTimeout(resolve, 5000, 'foo');
});

 new MyPromise().all([promise1, promise3]).then((values) => {
    console.log(values);
});
