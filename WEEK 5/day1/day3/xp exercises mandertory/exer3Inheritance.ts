class Animal {
    constructor(public name: string) {}
    makeSound(): string { return "sound"; }
}

class Dog extends Animal {
    makeSound(): string { return "bark"; }  
}