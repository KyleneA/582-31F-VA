## Inheritance
> [!Definition]
> Reusable behaviour and structure across types
>> **Inheritance** is based on prototypes (*prototype chain*)
>>  1. child object or child type links to parent prototype
>>  2. JS searches for method within child, then higher up chain if not found

| Type       | Description                                           |
| ---------- | ----------------------------------------------------- |
| **Parent** | *Defines* common data behaviour                       |
|            | - General category (ex: Animal)                       |
| **Child**  | *Reuses* the common behaviour outlined by parent type |
|            | - More specific subcategory of parent (ex: dog)       |
### Example
```js
function Animal(name) { // parent constructor function
    this.name = name;
}

// Parent prototype method
Animal.prototype.describe = function () {
    return `This animal is named ${this.name}`; 
};

function Dog(name, breed) {
    Animal.call(this, name); // runs parent constructor for Dog object
    this.breed = breed;
}

// connects Dog prototype to Animal parent prototype
Dog.prototype = Object.create(Animal.prototype); 
// allows Dog to use methods from Animal.prototype
Dog.prototype.constructor = Dog;

// Child Specific Method
Dog.prototype.bark = function () {
    return `${this.name} barks loudly`;
};

const dog1 = new Dog("Buddy", "Golden Retriever");

console.log(dog1.describe());
console.log(dog1.bark());
```

**Prototype Chain Steps from Example**
1. Does dog1 have the `describe()` method? -> **No**
2. Does `Dog.prototype` have it? -> **No**
3. Does `Animal.prototype` have it? -> **Yes**

### Modern Class Syntax
```js
class ParentClassName {
	constructor(attribute) {
		this.attribute = attribute;
	}
	
	parentMethod() {
		return `This class has ${this.attribute} attribute.`;
	}
}

class ChildClassName extends ParentClassName {
	constructor(attribute, childAttribute) {
		super(attribute); /* (probably) equivalent of 
			* Cat.prototype = Object.create(Animal.prototype);
			* Cat.prototype.constructor = Cat; */
		this.childAttribute = childAttribute;
	}
	
	childMethod() {
		return `This is related to the ${this.childAttribute} child attribute.`;
	}
}
```