class Product {
    readonly id: number;    // Immutable after creation
    public name: string;
    public price: number;
    
    constructor(id: number, name: string, price: number) {
        this.id = id;       // Set once in constructor
        this.name = name;
        this.price = price;
    }
}
// product.id = 102; // ❌ Compile-time error!