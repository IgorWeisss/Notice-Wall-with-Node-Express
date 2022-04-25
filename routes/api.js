const express = require('express')
const methods = require('../Posts/methods')
const router = express.Router()

//------------ Optional use of CORS ------------------
// const cors = require('cors')

// const options = {
//   origin: 'http://SERVER IP HERE/'
// }

// router.use(cors(options))

router.get('/all', (req, res) => {
  methods.readPosts().then(posts => {
    res.send(posts)
  })
})

router.delete('/del/:id', (req, res) => {
  let idToDelete = req.params.id
  methods.readPosts().then(posts => {
    let remainingPosts = posts.filter(post => {
      return post.id != idToDelete
    })
    let data = JSON.stringify(remainingPosts, null, 2)
    methods.writePosts(data)
    res.send('Post deletado com sucesso')
  })
})

router.post('/new', express.json(), (req, res) => {
  methods.readPosts().then(posts => {
    let id = Math.random().toString(32).substring(2, 12)
    let title = req.body.title
    let description = req.body.description

    posts.push({ id, title, description })
    let contentToWrite = JSON.stringify(posts, null, 2)
    methods.writePosts(contentToWrite).then(() => {
      res.send('Post adicionado!')
    })
  })
})

module.exports = router
