const links = document.querySelectorAll('.action-link')

async function fetch(event) {
    const id = event.target.getAttribute('data-id')
    const { data } = await axios.get('/dashboard/category/' + id)
    console.log(data)
    const ul = document.createElement('ul')
    data.forEach(element => {
        ul.innerHTML += `<li>${element.name}</li>`
    })
    event.target.appendChild(ul)
} 

links.forEach(link => {
    link.addEventListener('click', fetch)
})