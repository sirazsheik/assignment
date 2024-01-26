const express = require('express');
const { Book, EBook, Library } = require('./model');

const app = express();
const port = 3000;
app.use(express.json());

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
        await library.addBook(invalidBook); 
    } catch (error) {
        console.error(`Error while adding book: ${error.message}`);
    }

    const searchResult = library.searchBookByTitle("Web Development");
    if (searchResult) {
        console.log("\nSearch Result:");
        searchResult.displayInfo();
    } else {
        console.log("\nBook not found.");
    }

} catch (error) {
    console.error(`Error: ${error.message}`);
}


app.post('/books', (req, res) => {
    const { title, author, isbn, file_format } = req.body;
    db.run('INSERT INTO books (title, author, isbn, file_format) VALUES (?, ?, ?, ?)',
        [title, author, isbn, file_format],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Book added successfully' });
        });
});


app.get('/books', (req, res) => {
    db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});


app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Book deleted successfully' });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
