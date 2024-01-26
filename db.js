import sqlite3  from 'sqlite3';
const db = new sqlite3.Database('library.db');



export const initTable = async () => new Promise((resolve, reject) => { 
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT,
        isbn TEXT,
        file_format TEXT
    )
    `, (err) => {
        if (err) {
            reject({ error: err.message });
        }
        resolve("Table created");
    });
})

export const getAllBooks =  async () => new Promise((resolve, reject) => {
        db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            reject({ error: err.message });
        }
        resolve(rows);
    });
});

export const addBook = async (title, author, isbn, file_format) =>  {  
    new Promise((resolve, reject) => {
            db.run('INSERT INTO books (title, author, isbn, file_format) VALUES (?, ?, ?, ?)',
            [title, author, isbn, file_format],
            (err) => {
                if (err) {
                    reject({ error: err.message });
                }
                resolve("bookAdded");
            })
        }
    )
}

export const deleteBookFromDb =  async (id) => new Promise((resolve, reject) => {
        db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
        if (err) {
            return reject({ error: err.message });
        }
        resolve({ message: 'Book deleted successfully' });
    });
});