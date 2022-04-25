const express = require('express')
const app = express()
const api = require('./routes/api')
const path = require('path')
const PORT = 8080

app.use('/api', api)
app.use('/', express.static(path.join(__dirname, 'public')))

app.listen(PORT, err => {
  if (err) throw err
  console.log(`Server running on port: ${PORT}`)
})