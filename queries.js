// queries.js
const { MongoClient } = require('mongodb');

// Replace this with your actual MongoDB Atlas connection URI
const uri = "mongodb+srv://jsphmuchiri2030:Jemo123@cluster0.88x9qan.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB cluster
    await client.connect();

    // Select database and collection
    const db = client.db('plp_bookstore');
    const books = db.collection('books');

    // Task examples:

    // Find all books in a specific genre (e.g., Fiction)
    const fictionBooks = await books.find({ genre: "Fiction" }).toArray();
    console.log("Books in Fiction genre:", fictionBooks);

    // Find books published after 2015
    const recentBooks = await books.find({ published_year: { $gt: 2015 } }).toArray();
    console.log("Books published after 2015:", recentBooks);

    // Find books by a specific author
    const authorBooks = await books.find({ author: "Yuval Noah Harari" }).toArray();
    console.log("Books by Yuval Noah Harari:", authorBooks);

    // Update the price of a specific book (e.g., title "Sapiens")
    const updateResult = await books.updateOne(
      { title: "Sapiens" },
      { $set: { price: 19.99 } }
    );
    console.log(`Updated ${updateResult.modifiedCount} document(s)`);

    // Delete a book by its title (e.g., "The Lean Startup")
    const deleteResult = await books.deleteOne({ title: "The Lean Startup" });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    // Advanced query: Find books in stock and published after 2010, only title, author, price
    const filteredBooks = await books.find(
      { in_stock: true, published_year: { $gt: 2010 } },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log("In-stock books published after 2010:", filteredBooks);

    // Sorting example: sort books by price ascending
    const sortedBooksAsc = await books.find()
      .sort({ price: 1 })
      .toArray();
    console.log("Books sorted by price (asc):", sortedBooksAsc);

    // Pagination example: get 5 books per page, page 2 (skip first 5)
    const page2Books = await books.find()
      .skip(5)
      .limit(5)
      .toArray();
    console.log("Page 2 books (5 per page):", page2Books);

    // Aggregation example: average price by genre
    const avgPriceByGenre = await books.aggregate([
      { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Average price by genre:", avgPriceByGenre);

    // Aggregation example: author with most books
    const authorMostBooks = await books.aggregate([
      { $group: { _id: "$author", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log("Author with most books:", authorMostBooks);

    // Aggregation example: group books by decade and count
    const booksByDecade = await books.aggregate([
      {
        $group: {
          _id: {
            $concat: [
              { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
              "s"
            ]
          },
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log("Books grouped by decade:", booksByDecade);

    // Index creation example:
    // await books.createIndex({ title: 1 });
    // await books.createIndex({ author: 1, published_year: -1 });

    // Explain example for the compound index
    const explainResult = await books.find({ author: "Yuval Noah Harari", published_year: 2011 }).explain("executionStats");
    console.log("Explain output:", explainResult);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
