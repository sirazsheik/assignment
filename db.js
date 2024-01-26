const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('library.db');



const init = () => db.run(`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT,
        isbn TEXT,
        file_format TEXT
    )
`);

export const getAllBooks =  () => new Promise((resolve, reject) => {
        db.all('SELECT * FROM books', (err, rows) => {
        if (err) {
            reject({ error: err.message });
        }
        resolve(rows);
    });
});

export const addBook = (title, author, isbn, file_format) =>  {  
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