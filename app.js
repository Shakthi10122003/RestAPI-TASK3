// server.js (or app.js, index.js)

const express = require('express'); // Import Express framework
const app = express(); // Create an Express application

app.use(express.json()); // Middleware to parse JSON request bodies

let books = []; // In-memory array to store book objects
let nextId = 1; // Counter for unique book IDs

// GET route for the root URL
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Book API! Use /books to interact with the API.'); // Send welcome message
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json(books); // Return all books as JSON
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body; // Extract title and author from request body

  if (!title || !author) { // Validate if title and author are provided
    return res.status(400).json({ error: 'Title and author are required' }); // Send error if missing
  }

  const newBook = { id: nextId++, title, author }; // Create new book with unique ID
  books.push(newBook); // Add new book to the array
  res.status(201).json(newBook); // Respond with 201 Created status and the new book
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id); // Parse book ID from URL parameter
  const { title, author } = req.body; // Extract potential updates from body

  const book = books.find(b => b.id === bookId); // Find the book by its ID

  if (!book) { // If book not found
    return res.status(404).json({ error: 'Book not found' }); // Send 404 Not Found error
  }

  if (title) book.title = title; // Update title if provided
  if (author) book.author = author; // Update author if provided

  res.json(book); // Respond with the updated book
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id); // Parse book ID from URL parameter
  const index = books.findIndex(b => b.id === bookId); // Find index of the book

  if (index === -1) { // If book not found
    return res.status(404).json({ error: 'Book not found' }); // Send 404 Not Found error
  }

  const deletedBook = books.splice(index, 1)[0]; // Remove book from array and get the removed item
  res.json(deletedBook); // Respond with the deleted book
});

const PORT = 3000; // Define the port number
app.listen(PORT, () => { // Start the server and listen on the defined port
  console.log(`✅ Server is running on http://localhost:${PORT}`); // Log server start message
});