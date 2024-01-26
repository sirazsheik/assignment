import { addBook, getAllBooks, initTable } from "./db";

export class InitializationError extends Error {
    constructor(message) {
        super(message);
    }
}

export class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    getBookInfo() {
        return `Title: ${this.title}\nAuthor: ${this.author}\nISBN: ${this.isbn}`;
    }
}

export class Library {
    initialized = false;

    constructor() {
        this.init();  
    }
    
    async init () {
        try{
            this.books = await getAllBooks();
            await initTable()
        } catch (e) {
            console.log(e); 
        }
        this.initialized = true ;
    }
    
    async addBookToLibrary(book) {
        if (!this.initialized) {
            throw InitializationError("Library failed to initialize");
        }

        if (book instanceof Book || book instanceof EBook) {
            const {title, author, isbn, file_format} = book;
            await addBook(title, author, isbn, file_format);
            this.books.push(book);
        } else {
            throw new Error("Invalid book object");
        }
    }

    displayAllBooks() {
        if (!this.initialized) {
            throw InitializationError("Library failed to initialize");
        }

        this.books.forEach(book => {
            print(book.getBookInfo());    
        });
    }

    searchBooksByTitle(title) {
        if (!this.initialized) {
            throw InitializationError("Library failed to initialize");
        }

        return this.books.reduce((acc, book) => {
            if (book.includes(title)) {
                acc.push(book);
            }
        });
    }
}

export class EBook extends Book {
    constructor(title, author, isbn, fileFormat) {
        super(title, author, isbn);
        this.fileFormat = fileFormat;
    }

    getBookInfo() {
        return `${super.getBookInfo()} File Format: ${this.fileFormat}`;
    }
}