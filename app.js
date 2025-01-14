const express = require("express")

const app = express()
const port = 6969

app.use(express.json())

let bookId = 0;
let allBook = [
    {
        "title": "The Man Who Knew Infinity",
        "author": "Salman Rushdie",
        "publish": 1981,
        "genre": "biography",
        "id": bookId++
    },

    {
        "title": "The White Tiger",
        "author": "Aravind Adiga",
        "genre": "fiction",
        "publish": 2008,
        "id": bookId++
    },
    {
        "title": "Shantaram",
        "author": "Gregory David Roberts",
        "genre": "fiction",
        "publish": 2003,
        "id": bookId++
    },
    {
        "title": "A Mercy",
        "author": "Toni Morrison",
        "genre": "fiction",
        "publish": 2008,
        "id": bookId++
    },
    

]

app.get("/books", (req, res) => {
    const { author, publish, genre } = req.query;


    // Filter the array based on the query parameters If True then book will be included and If false then don't
    let filteredBooks = allBook.filter(book => {
        return (!author || book.author.toLowerCase() === author.toLowerCase()) &&
        (!publish || book.publish.toString() === publish) &&
        (!genre || book.genre.toLowerCase() === genre.toLowerCase());
    });


    //  return the full array, If No query is provided
    if (!author && !publish && !genre) {
        return res.send(allBook);
    }

    // If No filter match, Then Retrun empty array
    if (filteredBooks.length === 0) {
        return res.send([]);
    }

    // Return the filtered array
    res.send(filteredBooks);
});



app.post("/books", (req, res) => {
    let book = req.body
    book.id = bookId++;
    allBook.push(book)
    res.status(200).send(`Book ${book.title} by ${book.author} is added Sucessfully...`)
})
app.get("/books/:id", (req, res) => {
    let book = allBook.find(e => e.id === Number(req.params.id))
    if (!book) res.status(404).send(`Book of id : ${req.params.id} Not Found!`)
    res.status(200).send(book)
})


app.delete("/books/:id", (req, res) => {

    let book = allBook.find(e => e.id === Number(req.params.id))
    if (!book) {
        res.status(404).send(`Book of id : ${req.params.id} Not Found!`)
    } else {
        allBook = allBook.filter(e => e !== book)
        res.status(200).send(`Book "${(book.title)}" with id : ${req.params.id} is removed sucessfully`)
    }

})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`)
})