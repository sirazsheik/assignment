import express from 'express';
import { Library } from './model.js';

const app = express();
const port = 3000;
app.use(express.json());

const library = new Library();

try {
    library.init();
} catch (e) {
    console.log(e);
}


app.post('/add', (req, res) => {
    if (!library.isInitalized()) {
        return res.status(500).json({error: 'Library is under matanience'});
    }

    const { title, author, isbn, file_format } = req.body;
    if (title === undefined || author === undefined || isbn === undefined) {
        return res.status(400).json({error: "Invalid data"});
    } 

    const book = library.constructABook(req.body);
    try {
        library.addBookToLibrary(book);
        return res.status(200).json({msg: "succesfully added book"});
    } catch (e) {
        return res.status(500).json({error: e});
    }
});


app.get('/list', (req, res) => {
    try {
        const books = library.getAllBooks();
        return res.status(200).json(books);
    } catch (e) {
        return res.status(500).json({error: "Unable to fetch the data"});
    }
});


app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({msg: "id is must to delete a book"});
    }
    try {
        library.deleteBook(id);
        return res.status(200).json({msg: "delete from  the library"})
    } catch (e) {
        return res.status(500).json({error: "Unable to delete"});
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
