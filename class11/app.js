import { Animal, Cat, Dog } from "./notes/notes.js"

// Parent Constructor
function Vehicle(brand){
    this.brand = brand;
}

// Parent Method
Vehicle.prototype.describe = function () {
    return `Vehicle brand: ${this.brand}`;
}

// Parent Property
Vehicle.prototype.type = "transportation";

// Child constructor
function Car(brand, model, running) {
    Vehicle.call(this, brand);
    this.model = model;
    this.running = running;
}

// Connecting child to parent
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constuctor = Car;

// Overriding inherited method
Car.prototype.describe = function () {
    return `This vehicle is a ${this.brand}: ${this.model}.`
}

// Child specific methods
Car.prototype.start = function () {
    this.running = true;
    return `${this.model} is now running`;
};

Car.prototype.stop = function () {
    this.running = false;
    return `${this.model} has stopped running`;
};

Car.prototype.showModel = function () {
    return `Model: ${this.model}`;
};

// Car Child
function ElectricCar(brand, model, running, batteryLevel){
    Car.call(this, brand, model, running);
    this.batteryLevel = batteryLevel;
}

ElectricCar.prototype = Object.create(Car.prototype);
ElectricCar.prototype.constuctor = ElectricCar;

ElectricCar.prototype.charge = function () {
    this.batteryLevel = "full";
    return `${this.model}'s battery level is now ${this.batteryLevel}`;
};

// Additional Type
function Truck(brand, codeName, travelStatus){
    Vehicle.call(this, brand);
    this.codeName = codeName;
    this.travelStatus = travelStatus;
}

Truck.prototype = Object.create(Vehicle.prototype);
Truck.prototype.constuctor = Truck;

Truck.prototype.startTrip = function () {
    this.travelStatus = "started"
    return `${this.codeName} has ${this.travelStatus} its trip`;
};

Truck.prototype.endTrip = function () {
    this.travelStatus = "finished"
    return `${this.codeName} has ${this.travelStatus} its trip`;
};

Truck.prototype.midwayTrip = function () {
    this.travelStatus = "midway"
    return `${this.codeName} is ${this.travelStatus} its trip`;
};

// Displaying in the page
const demoBtn = document.getElementById("run-demo-btn");
const outputDiv = document.getElementById("output");

demoBtn.addEventListener("click", () => {
    const car1 = new Car("Toyota", "Corolla");
    const car2 = new ElectricCar("Nissan", "Leaf", true, "half");

    const truck1 = new Truck ("Nissan", "LongHauler", true, "awaiting");

    const dog1 = new Dog("Buddy", "Pug");

    const cat1 = new Cat("Sagwa", "White");

    console.log("Before method: ", car1.running ?? false, car2.running ?? false);
    
    outputDiv.innerHTML = `
        <br>

        <article class="vehicles">
            <em>Parent Method</em>
            <p>${car1.describe()}</p>
            
            <em>Child Method</em>
            <p>${car1.showModel()}</p>
            <p>${car1.start()}</p>
            
            <hr>
            
            <em>Parent Method</em>
            <p>${car2.describe()}</p>
            <em>Child Method</em>
            <p>${car2.showModel()}</p>
            <p>${car2.stop()}</p>
            <em>Child Child Method</em>
            <p>${car2.charge()}</p>
            
            <hr>
            
            <em>Parent Method</em>
            <p>${truck1.describe()}</p>
            
            <em>Child Method</em>
            <p>${truck1.startTrip()}</p>
            <p>${truck1.midwayTrip()}</p>
            <p>${truck1.endTrip()}</p>
            </article>
            
        <hr>
            
        <article class="animals">
            <em>Parent Method</em>
            <p>${dog1.describe()}</p>
            <em>Child Method</em>
            <p>${dog1.bark()}</p>
            
            <hr>
            
            <em>Parent Method</em>
            <p>${cat1.describe()}</p>
            <em>Child Method</em>
            <p>${cat1.meow()}</p>
        </article>
    `;

    console.log("After method: ", car1.running ?? false, car2.running ?? false);
    console.log("-----");
    console.log("Dog, Animal", Object.getPrototypeOf(Dog.prototype) === Animal.prototype);
    console.log("Cat, Animal", Object.getPrototypeOf(Cat.prototype) === Animal.prototype);
    console.log("Car, Vehicle", Object.getPrototypeOf(Car.prototype) === Vehicle.prototype);
    console.log("ElectricCar, Car", Object.getPrototypeOf(ElectricCar.prototype) === Car.prototype);
});