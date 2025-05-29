// insert_books.js
const { MongoClient } = require('mongodb');

async function insertBooks() {
  const uri = "mongodb+srv://jsphmuchiri2030:Jemo123@cluster0.88x9qan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    const sampleBooks = [
      { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", published_year: 2011, price: 18.99, in_stock: true, pages: 443, publisher: "Harper" },
      { title: "Homo Deus", author: "Yuval Noah Harari", genre: "Fiction", published_year: 2015, price: 22.50, in_stock: true, pages: 450, publisher: "Harper" },
      { title: "Clean Code", author: "Robert C. Martin", genre: "Programming", published_year: 2008, price: 32.99, in_stock: true, pages: 464, publisher: "Prentice Hall" },
      { title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Programming", published_year: 1999, price: 25.00, in_stock: false, pages: 352, publisher: "Addison-Wesley" },
      { title: "1984", author: "George Orwell", genre: "Dystopian", published_year: 1949, price: 15.00, in_stock: true, pages: 328, publisher: "Secker & Warburg" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", published_year: 1960, price: 18.50, in_stock: false, pages: 281, publisher: "J.B. Lippincott & Co." },
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", published_year: 1925, price: 14.99, in_stock: true, pages: 180, publisher: "Charles Scribner's Sons" },
      { title: "Deep Work", author: "Cal Newport", genre: "Self-help", published_year: 2016, price: 20.00, in_stock: true, pages: 304, publisher: "Grand Central Publishing" },
      { title: "Atomic Habits", author: "James Clear", genre: "Self-help", published_year: 2018, price: 21.99, in_stock: true, pages: 320, publisher: "Penguin Random House" },
      { title: "The Lean Startup", author: "Eric Ries", genre: "Business", published_year: 2011, price: 19.99, in_stock: false, pages: 336, publisher: "Crown Business" },
    ];

    const result = await books.insertMany(sampleBooks);
    console.log(`${result.insertedCount} books inserted.`);
  } catch (err) {
    console.error("Error inserting books:", err);
  } finally {
    await client.close();
  }
}

insertBooks();
