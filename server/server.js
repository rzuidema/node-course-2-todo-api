var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

var PORT = 3000;

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then(
        (doc) => 
        {
          res.send(doc);
        }, 
        (error) => 
        {
            res.status(400).send(error);
        });
});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) => {
        res.send({todos: todos});
    },(error)=>{
        res.status(400).send(error);
    });
});

app.listen(PORT||3000, () => {
    console.log(`Server started in port ${PORT}`);
});

module.exports = { app };