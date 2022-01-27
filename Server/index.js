const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'deuslink',
  password : 'deuslink',
  database : 'artgram_db'
})

const protectedRoute = (req, res, next) => {
  const token = req.headers["authorization"]
  if(!token)
    return res.status(401).json({ error: "Unauthorized" })

  jwt.verify(token, 'llavesecreta', (err, decoded) => {
    if(err)
      return res.status(401).json({ error: "Unauthorized" })
    
    req.decoded = decoded
    next()
  })
}

require('./resources/users.js')(app, connection, protectedRoute)
require('./resources/posts.js')(app, connection, protectedRoute)


app.listen(4000, () => {
  console.log("Server on port 4000")
})