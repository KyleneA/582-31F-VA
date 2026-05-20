## Modules
> [!Definition]
> JS file with its own scope that can export code for use in other files
>> They help
>> 1. organize code
>> 2. avoid having one giant script file
>> 3. reuse logic
>> 4. separate responsibilities

### Loading the script to use in the browser
```html
<script type="module" src="./path/file_name.js"></script>
<!-- type="module" is required for the script to load properly -->
```

### Exporting code
For files to share a function, variable, or class, it needs to be exported
```js
export function functionName (name) {
	return `Hello! ${name}`;
}

export const API_URL = "https://jsonplaceholder.typicode.com/users";
```

### Importing to other JS files
To be able to use the function, etc., the target file needs to import the code
```js
import { functionName, API_URL } from "./path/file_name.js";

// calling the function 
console.log(functioName("Bob")); 

// using the constant
console.log(API_URL);
```
> [!Important]
> relative references must start with either: 
> - **"/"** -> separates folders in path, 
> - **"./"** -> from current directory, or 
> - **"../"** -> Goes back one level in directory (parent folder)