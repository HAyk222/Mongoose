const { Router } = require('express');
const routes = Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  }
});

const todos = mongoose.model('todo', todoSchema);

routes.get('/', (req, res) => {
    todos.find({})
    .exec(function(err, all) {
      if(err) {
        res.send('error')
      } else {
        console.log(all);
        res.render("home", {allTodoes: all})
      }
    });
})

routes.get('/edit/:id', (req, res) => {
    todos.findOne({
    _id: req.params.id
    })
    .exec(function(err, item) {
      if(err) {
        res.send('error')
      } else {
        console.log(item);
        res.render("edit",{todo: item})
      }
    });
})

routes.post('/', (req, res) => {
    todos.create(req.body, function(err, all) {
        if(err) {
          res.send('error');
        } else {
          console.log(all);
          res.redirect('/')
        }
    });
})

routes.put('/update/:id', (req, res) => {
    todos.findOneAndUpdate({
        _id: req.params.id
        },
        { $set: { todo: req.body.editTodo }
    }, {runValidators: true}, function(err, newTodo) {
        if (err) {
          res.send('error');
        } else {
          console.log(newTodo);
          res.redirect('/')
        }
    });
})

routes.get('/delete/:id', (req, res) => {
    todos.findOneAndRemove({
        _id: req.params.id
    }, function(err, item) {
        if(err) {
          res.send('error removing')
        } else {
          console.log(item);
          res.redirect('/')
        }
    });
});

module.exports = routes;