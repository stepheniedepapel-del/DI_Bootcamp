// ============================================
// INTERFACE: Book
// ============================================
interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string; // Optional property
}

// ============================================
// CLASS: Library (Base Class)
// ============================================
class Library {
    // Private property - only accessible within this class
    private books: Book[];

    constructor() {
        this.books = [];
    }

    // Public method to add a new book
    public addBook(book: Book): void {
        this.books.push(book);
        console.log(`✅ Added: "${book.title}" by ${book.author}`);
    }

    // Public method to get book details by ISBN
    public getBookDetails(isbn: string): Book | undefined {
        const book = this.books.find(b => b.isbn === isbn);
        if (book) {
            return book;
        } else {
            console.log(`❌ Book with ISBN ${isbn} not found.`);
            return undefined;
        }
    }

    // Protected method to access books array (for subclasses)
    protected getAllBooks(): Book[] {
        return this.books;
    }
}

// ============================================
// CLASS: DigitalLibrary (Extends Library)
// ============================================
class DigitalLibrary extends Library {
    // Readonly property - can only be set during initialization
    readonly website: string;

    constructor(website: string) {
        super(); // Call parent constructor
        this.website = website;
    }

    // Public method to list all book titles
    public listBooks(): string[] {
        const books = this.getAllBooks(); // Access inherited protected method
        return books.map(book => book.title);
    }

    // Additional method to display library info
    public getLibraryInfo(): string {
        const bookCount = this.getAllBooks().length;
        return `📚 Digital Library: ${this.website} | Total Books: ${bookCount}`;
    }
}

// ============================================
// TESTING THE LIBRARY SYSTEM
// ============================================

// Create instance of DigitalLibrary
const myDigitalLibrary = new DigitalLibrary("https://mydigitallibrary.com");

console.log("=".repeat(50));
console.log(myDigitalLibrary.getLibraryInfo());
console.log("=".repeat(50));

// Add some books
const book1: Book = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    genre: "Classic"
};

const book2: Book = {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    publishedYear: 1949,
    genre: "Dystopian"
};

const book3: Book = {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    publishedYear: 2008
    // Note: no genre (optional property)
};

myDigitalLibrary.addBook(book1);
myDigitalLibrary.addBook(book2);
myDigitalLibrary.addBook(book3);

console.log("\n" + "=".repeat(50));

// Get details of a specific book
console.log("\n📖 Looking up book details:");
const foundBook = myDigitalLibrary.getBookDetails("978-0451524935");
if (foundBook) {
    console.log(`Title: ${foundBook.title}`);
    console.log(`Author: ${foundBook.author}`);
    console.log(`ISBN: ${foundBook.isbn}`);
    console.log(`Year: ${foundBook.publishedYear}`);
    console.log(`Genre: ${foundBook.genre || "Not specified"}`);
}

// Try to find a non-existent book
console.log("\n🔍 Searching for non-existent book:");
myDigitalLibrary.getBookDetails("123-4567890123");

console.log("\n" + "=".repeat(50));

// List all book titles
console.log("\n📋 All Book Titles in Library:");
const titles = myDigitalLibrary.listBooks();
titles.forEach((title, index) => {
    console.log(`${index + 1}. ${title}`);
});

console.log("\n" + "=".repeat(50));
console.log(myDigitalLibrary.getLibraryInfo());

// Demonstrate readonly property
console.log(`\n🔗 Website: ${myDigitalLibrary.website}`);
// myDigitalLibrary.website = "https://newsite.com"; // ❌ Error: Cannot assign to 'website' because it is a read-only property