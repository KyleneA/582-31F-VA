export function Animal(name) { // parent constructor function
    this.name = name;
}

// Parent prototype method
Animal.prototype.describe = function () {
    return `This animal is named ${this.name} from the ${this.kingdom} kingdom`; 
};

// Parent Property
Animal.prototype.kingdom = "Animalia";

export function Dog(name, breed) {
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

// console.log(dog1.describe());
// console.log(dog1.bark());

// Independent Task
export function Cat(name, color) {
    Animal.call(this, name);
    this.color = color;
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.meow = function () {
    return `${this.name} meows lovingly`;
}

class VehicleClass {
    constructor(brand) {
        this.brand = brand;
    }

    describe() {
        return `This is a ${this.brand} vehicle.`;
    }
}

class CarClass extends VehicleClass {
    constructor(brand, model, running){
        super(brand);
        this.model = model;
        this.running = running;
    }

    start() {
        this.running = true;
        return `${this.model} is now running`;
    }

    stop() {
        this.running = false;
        return `${this.model} has stopped running`;
    }

    showModel() {
        return `Model: ${this.model}`;
    }
}

console.log();
console.log("-----PART 7-----");
console.log();

const car3 = new CarClass("Volkswagen", "Tiguan", false);
console.log(car3.describe());
console.log(car3.showModel());
console.log(car3.start());
console.log(car3.stop());
