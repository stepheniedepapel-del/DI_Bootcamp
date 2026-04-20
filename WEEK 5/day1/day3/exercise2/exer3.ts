class MathUtils {
    static PI: number = 3.14159;

    static circumference(radius: number): number {
        // Access static property using ClassName.property
        return 2 * MathUtils.PI * radius;
    }
}

// Call static method WITHOUT creating an instance
const circleCircumference = MathUtils.circumference(5);
console.log(`Circumference: ${circleCircumference}`);
// Output: Circumference: 31.4159

// Access static property directly
console.log(`PI value: ${MathUtils.PI}`);
// Output: PI value: 3.14159

// These won't work - static members belong to the class, not instances
// const utils = new MathUtils();
// utils.circumference(5);  // ❌ Error: Property 'circumference' does not exist on type 'MathUtils'