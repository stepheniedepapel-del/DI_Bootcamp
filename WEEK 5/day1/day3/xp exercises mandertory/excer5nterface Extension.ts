interface User {
    readonly id: number;           // Immutable
    name: string;
    email: string;
}

interface PremiumUser extends User {
    membershipLevel?: string;      // Optional (?)
}