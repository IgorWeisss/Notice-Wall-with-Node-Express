const board = document.getElementById('board')

document.addEventListener('DOMContentLoaded', ()=>{
  updatePosts()
})

function updatePosts() {
  fetch('/api/all').then(data => {
    data.json()
    .then(posts =>{
      board.innerHTML=''
      posts.forEach(post => {
        let el = createCard(post)
        board.innerHTML += el
      });
    })
  })
}

function createCard(post) {
  return `
  <div id="${post.id}" class="card">
      <div class="card-header">
        <div class="d-flex justify-content-center mb-3 position-relative">
          <img class="pin" src="assets/pin.png" alt="pin">
          <button type="button" class="btn-close close" onclick="deletePost(this)"></button>
        </div>
        <h3 class="card-title m-0 text-center">${post.title}</h3>
      </div>
      <div class="card-body">
        <p class="card-text text-center">${post.description}</p>
      </div>
    </div>
  `
}

function savePost() {
  let title = document.getElementById('title').value
  let description = document.getElementById('description').value
  
  let post = {title, description}

  const options = {
    method: 'POST',
    headers: new Headers({'content-type': 'application/json'}),
    body: JSON.stringify(post)
  }

  fetch('/api/new', options).then(res=>{
    res.text().then(res => console.log(res))
    updatePosts()
    document.getElementById('title').value=''
    document.getElementById('description').value=''
  })
}

function deletePost(post) {
  let postId = post.parentElement.parentElement.parentElement.id
  
  const options = {
    method: 'DELETE'
  }
  
  fetch(`/api/del/${postId}`, options).then(res => {
    res.text().then(res => console.log(res))
    updatePosts()
  })
}