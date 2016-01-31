const arr = [' foo  ', ' bar', 'baz  '];

function f() {
    console.log(this, arguments);
}

console.log(arr.map(Function.call, String.prototype.trim));
