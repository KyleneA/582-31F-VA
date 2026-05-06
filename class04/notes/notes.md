## Classes and JS objects as returns
Base for understanding APIs

=> important to know **concurrencies**
- promises allow us to wrap eventual outcomes for us so that wer don't have to wait until the outcome is present
### API - Application Program Interface
set of rules and protocols that allow different applications to communicate with one another

### Simple Chains and Promises
- simple chains are promises that are connected together
```js
Promise.resolve(5)
	.then((result) => {
        console.log(`Part 1: ${result}`); // => prints 5
		return result * 2;
	})
	.then((result) => {
		console.log(`Part 2: ${result}`); // => prints 10
        return result * 10;
	})
    .then((result) => {
        console.log(`Part 3: ${result}`) // => prints 100
    });
```

### Common Mistakes
- expecting the Promise to be the final value
	- will receive the Promise object instead
- forgetting to return (either in a function or in the `.then()` or `.catch()`)
	- forgetting the return would often result in *undefined*
- not adding a catch for failures will eventually break the code
- Using `Promises` for tasks that need to occur in a specific order
	- not anticipating timing of code execution
	```js
	// executes 1
	let data = 0;
	
	// executes 2
	Promise.resolve(5)
	.then((result) => {
	// executes 4
		data = result;
	});
	
	// executes 3
	console.log(data); // => prints 0
	```

### `setTimeout()` vs `Promise`
- `setTimeout()`
	- Executes after indicated time delay (schedule work later)
- `Promise`
	- It wraps future completion in a structured way
	- If condition matched (human-imposed), it either passes resolved or reject 
		- Dynamic
	- Avoids callback hell (allows us to execute properly)
