import { Book, EBook, Library } from './model.js';

try {
    const book1 = new Book("Python Basics", "John Doe", "123456789");
    const ebook1 = new EBook("Web Development", "Jane Smith", "987654321", "PDF");
    
    const library = new Library();
    await library.init();
    await library.addBookToLibrary(book1);
    await library.addBookToLibrary(ebook1);

    console.log("\nAll Books in Library:");
    library.displayAllBooks();
  
    try {
        const invalidBook = { title: "Invalid Book", author: "Unknown" };
        await library.addBookToLibrary(invalidBook); 
    } catch (error) {
        console.error(`Error while adding book: ${error.message}`);
    }

    const searchResult = library.searchBooksByTitle("Web Development");
    if (searchResult.length) {
        console.log("\nSearch Result:");
        for (const book of searchResult) {
            console.log(book.getBookInfo());
        }
    } else {
        console.log("\nBooks not found.");
    }

} catch (error) {
    console.error(`Error: ${error.message}`);
}
