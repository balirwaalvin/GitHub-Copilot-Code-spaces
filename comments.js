// Create web server
// Create a route for POST /comments
// Create a route for GET /comments
// Create a route for GET /comments/:id
// Create a route for PUT /comments/:id
// Create a route for DELETE /comments/:id
// Create a route for GET /comments/:id/upvote
// Create a route for GET /comments/:id/downvote

const express = require('express');
const app = express();

app.use(express.json());

const comments = [];

// Create a route for POST /comments
app.post('/comments', (req, res) => {
  const { body } = req.body;
  const id = comments.length;
  comments.push({ id, body, upvotes: 0, downvotes: 0 });
  res.status(201).json({ id });
});

// Create a route for GET /comments
app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

// Create a route for GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments[id];
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create a route for PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const comment = comments[id];
  if (comment) {
    comment.body = body;
    res.status(200).json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create a route for DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments[id];
  if (comment) {
    comments.splice(id, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create a route for GET /comments/:id/upvote
app.get('/comments/:id/upvote', (req, res) => {
  const { id } = req.params;
  const comment =