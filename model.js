import { addBook, getAllBooks } from "./db";

class InitializationError extends Error {
    
}

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    displayInfo() {
        console.log(`Title: ${this.title}\nAuthor: ${this.author}\nISBN: ${this.isbn}`);
    }
}

class Library {
    initialized = false;

    constructor() {
        this.init();  
    }
    
    async init () {
        try{
            this.books = await getAllBooks();
        } catch (e) {
            console.log(e); 
        }
        this.initialized = true 
    }
    
    addBookToLibrary(book) {
        if (book instanceof Book || book instanceof EBook) {
            this.books.push(book);
        const {title, author, isbn, file_format} = book;
        addBook(title, author, isbn, file_format);
        } else {
            throw new Error("Invalid book object");
        }
    }

    displayAllBooks() {
        this.books.forEach(book => {
            book.displayInfo();
            
        });
    }

    searchBookByTitle(title) {
        return this.books.find(book => book.title === title) || null;
    }
}

class EBook extends Book {
    constructor(title, author, isbn, fileFormat) {
        super(title, author, isbn);
        this.fileFormat = fileFormat;
    }

    displayInfo() {
        super.displayInfo();
        console.log(`File Format: ${this.fileFormat}`);
    }
}