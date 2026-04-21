class Car {
  #brand;
  #model;
  

  constructor(carDetails) {
      this.#brand = carDetails.brand;
      this.#model = carDetails.model;
      this.speed = 0;
      this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}
      `);
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }

    if(this.speed > 200) {
      this.speed = 200
    }
  }

  brake() {
    this.speed -= 5;

    if(this.speed < 0) {
      this.speed = 0;
    }
  }

  openTrunk(){
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;
  #brand;
  #model;


  constructor(carDetails) {
    super(carDetails);
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
    this.isTrunkOpen = '';
    this.acceleration = carDetails.acceleration;
  }

  displayInfo() {
    const trunkStatus = '';
    console.log(
      `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h
      `);
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {}

  closeTrunk() {}
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car ({
  brand: 'Tesla',
  model: 'Model 3'
});

const raceCar1 = new RaceCar ({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(car1);
console.log(car2);

car1.displayInfo();
car2.displayInfo();




raceCar1.displayInfo();

console.log(raceCar1);
