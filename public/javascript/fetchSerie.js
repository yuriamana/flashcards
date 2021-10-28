const links = document.querySelectorAll('.action-link')

async function fetch(event) {
    const ul = event.target.querySelector('.super-list')
    if (ul.classList.contains('active')) {
        ul.innerHTML = ''
        ul.classList.remove('active')
    } else {

        ul.classList.add('active')
        ul.innerHTML = ''
        const id = event.target.getAttribute('data-id')
        const { data } = await axios.get('/dashboard/category/' + id)
        console.log(data)
        
        data.forEach(element => {
            ul.innerHTML += `<li><a href='/game/${element._id}'>${element.name}</a></li>`
        })
        event.target.appendChild(ul)
    }
} 

links.forEach(link => {
    link.addEventListener('click', fetch)
    const name = link.textContent
    console.log(name)
    link.style.background = `url(../images/${name})`
    link.style.backgroundSize = 'cover'
    link.style.margin = '1em 0'
})




const card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});