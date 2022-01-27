const multer = require("multer")
const upload = multer({ dest: "public/uploads/" })

module.exports = (app, connection, protectedRoute) => {
  app.get('/api/posts', (req, res) => {
    connection.query("SELECT * from posts", (err, result) => {
      if(err) throw err
  
      return res.json(result)
    })
  })

  app.get('/api/posts/:id', (req, res) => {
    connection.query(`SELECT * from posts WHERE post_id = ${req.params.id}`, (err, result) => {
      if(err) throw err
  
      return res.json(result[0])
    })
  })

  app.post('/api/posts', upload.single('source'), (req, res) => {
    const i = req.body
    const file = req.file
    
    connection.query(`INSERT INTO posts (title, description, source, user_id) VALUES ('${i.title}', '${i.description}', 'uploads/${file.filename}', '${i.user_id}')`, (err, result) => {
      if(err) throw err

      return res.json({ ok: true })
    })
  })

  app.post('/api/posts/like/:postId/:userId', (req, res) => {
    const post_id = req.params.postId
    const user_id = req.params.userId

    connection.query(`INSERT INTO user_likes (user_id, post_id) VALUES ('${user_id}', '${post_id}')`, (err, result) => {
      if(err) throw err

      connection.query(`UPDATE posts SET likes = likes + 1 WHERE post_id = ${post_id}`, (err, result) => {
        return res.json({ ok: true })
      })

      
    })
  })

  app.get('/api/posts/likes/:userId', (req, res) => {
    const user_id = req.params.userId

    connection.query(`SELECT post_id from user_likes WHERE user_id = ${user_id}`, (err, result) => {
      if(err) throw err

      var resp = []
      for (const element of result) {
        resp.push(element.post_id)
      }
  
      return res.json(resp)
    })
  })

  app.get('/api/posts/:id/comments', (req, res) => {
    connection.query(`SELECT comments.comment_id, users.username, comments.content, comments.user_id, comments.post_id FROM comments INNER JOIN users ON comments.user_id = users.user_id WHERE comments.post_id = ${req.params.id}`, (err, result) => {
      if(err) throw err
      return res.json(result)
    })
  })

  app.post('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id
    const userId = req.body.userId
    const content = req.body.content
    connection.query(`INSERT INTO comments (user_id, post_id, content) VALUES ('${userId}', '${postId}', '${content}')`, (err, result) => {
      if(err) throw err
      return res.json({ ok: true })
    })
  })
}