const fs = require('fs')

const methods = {

  readPosts: function readPosts() {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile('./Posts/posts.json', (err, data) => {
          if (err) throw err
          let posts = JSON.parse(data)
          resolve(posts)
        })
      } catch (error) {
        reject(error)
      }
    })
  },

  writePosts: function writePosts(content) {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFile('./Posts/posts.json', content, err => {
          if (err) throw err
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }

}

module.exports = methods
