import { addBook, deleteBookFromDb, getAllBooks, initTable } from "./db.js";

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

    putId (id) {
        this.id = id;
    }
}

export class Library {
    initialized = false;
    autoIntrementId = 0;

    constructor() {
        this.init();  
    }

    constructABook(book) {
        if (book.fileFormat) {
            return new EBook(book.title, book.author, book.isbn, book.fileFormat);
        } else {
            return new Book(book.title, book.author, book.isbn);
        }
    }
    
    async init () {
        try{
            await initTable()
            const dbBooks = await getAllBooks();
            this.books = dbBooks.map((book) => this.constructABook(book));
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
            book.id = this.autoIntrementId + 1;
            this.autoIntrementId += 1; 
            this.books.push(book);
        } else {
            throw new Error("Invalid book object");
        }
    }

    isInitalized() {
        return this.initialized;
    }

    displayAllBooks() {
        if (!this.initialized) {
            throw InitializationError("Library failed to initialize");
        }

        this.books.forEach(book => {
            console.log(book.getBookInfo());    
        });
    }

    getAllBooks() {
        return this.books;
    }

    searchBooksByTitle(title) {
        if (!this.initialized) {
            throw InitializationError("Library failed to initialize");
        }

        return this.books.reduce((filteredBooks, book) => {
            if (book.title.includes(title)) {
                filteredBooks.push(book);
            }
            return filteredBooks;
        }, []);
    }

    async deleteBook(id) {
        try {
            await deleteBookFromDb(id);            
            this.books = this.books.filter((book) => book.id != id);
        } catch (e) {
           throw new Error({message: "Unable to delete"});
        }
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