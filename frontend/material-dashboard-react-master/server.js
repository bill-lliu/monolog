const express = require('express')
const bodyParser = require('body-parser')

const port = process.env.PORT || 5555;
const app = express()

app.use(
    bodyParser.urlencoded({extended: false})
);

// GET
// Returns an array of all pathways
app.get('/test', (req, res) =>{
    res.json([
        {id:1, name:"bill"}
    ])
})

// Emotion get
app.get('/emotion', (req, res) =>{
    res.json([
        {id:1, name:"bill"}
    ])
})
// store emotion data as a global variable

app.get('/text', (req, res) =>{
    res.json([
        {id:1, name:"bill"}
    ])
})

app.listen(port, ()=>{
    console.log('api started on port ', port)
})