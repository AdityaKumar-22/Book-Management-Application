const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

//middleware
app.use(cors());
app.use(express.json());

//bcYptHw8FhQ7iZRn
//mongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://book-management:bcYptHw8FhQ7iZRn@cluster0.finob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // create a collection
    const bookCollection = client.db("bookInventory").collection("books");

    //insert a book : post Method
    app.post('/addBook', async (req, res) => {
      const newBook = req.body;
      const result = await bookCollection.insertOne(newBook);
      console.log('got new book', result);
      res.send('book added successfully');
    });
    //Get all books : get Method
    app.get('/books', async (req, res) => {
      const cursor = bookCollection.find({});
      const books = await cursor.toArray();
      res.send(books);
    });
    //update a book : patch or update Method
    app.patch('/update/:id', async (req, res) => {
      const id=req.params.id;
      const updatedBook = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...updatedBook,
        },
      };
      //update the book
      const result = await bookCollection.updateOne(filter, updateDoc, options);
      res.send(result); 

    });
    //get single book data
    app.get('/book/:id', async (req, res) => {
      const id=req.params.id;
      const filter = {_id: new ObjectId(id)};
      const book = await bookCollection.findOne(filter);
      res.send(book);
    });

    //delete a book : delete Method
    app.delete('/delete/:id', async (req, res) => {
      const id=req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await bookCollection.deleteOne(filter);
      res.send(result);
    });

    //filter a book by category
    app.get('/books/:category', async (req, res) => {
      const category = req.params.category;
      const query = { category: category };
      const cursor = bookCollection.find(query);
      const books = await cursor.toArray();
      res.send(books);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})