## Exception
> [!Definition]
> *Error* that interrupts normal execution like
> - invalid data
> - parsing invalid JSON
> - receiving failed HTTP response
> - custom validation failure
### Why handle errors
- prevents crashes
- show useful feedback
- recover more gracefully
- separate normal flow from error flow
### Structure
JS uses
- `try`
- `catch`
- `finally`
	- Good for clean up, resetting UI state, stopping loading indicators
```js
try{
	// code that may fail
} catch (error) {
	// code that runs if an error happens
} finally {
	// code that always runs
}
```
Example:
```js
try {
    console.log("Trying something...");
    throw new Error("Example failure"); // without throwing the error the catch will not run
} catch (error) {  
    console.log("Caught:", error.message);
} finally {
    console.log("This always runs");
}
```
### When to throw error
- Input validation
- `fetch()` doesn't automatically go directly to catch with response.ok === false
Examples:
- when number is negative when it shouldn't be
- a username is blank
- a required field is missing
- a fetched response has a bad status

### Error flow
Synchronous:
- `try/catch`
asynchronous:
- `.catch()`