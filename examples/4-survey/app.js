const title = document.querySelector('.title h2')
const result = document.querySelector('.result')



const fetchData = async () => {
   try {
      const { data } = await axios.get('/api/4-survey')
      const response = data.map((item) => {
         const { room, votes, id } = item
         return `
            <li>
               <div class="key">${room.toUpperCase().substring(0, 2)}</div>
               <div>
                  <h4>${room}</h4>
                  <p class="vote-${id}" data-votes=${votes}>${votes} votes</p>
               </div>
               <div>
                  <button data-id="${id}">
                     <i class="fas fa-vote-yea"></i>
                  </button>
               </div>
            <li>
            `
      }).join(' ')
      result.innerHTML = response
   } catch (error) {
      result.innerHTML = `<h2>There was an error!</h2>`
   }

}

window.addEventListener('load', () => fetchData())

// Modify Data 

result.addEventListener('click', async (e) => {
   if (e.target.classList.contains('fa-vote-yea')) {
      const btn = e.target.parentElement
      const id = btn.dataset.id
      const voteNode = result.querySelector(`.vote-${id}`)
      const votes = voteNode.dataset.votes
      const newVotes = await modifyData(id, votes)
      title.textContent = 'Survey'
      if (newVotes) {
         voteNode.textContent = `${newVotes} votes`
         voteNode.dataset.votes = newVotes
      }
   }

})

const modifyData = async (id, votes) => {
   title.textContent = 'Loading...'
   try {
      const { data } = await axios.put(`/api/4-survey`, { id, votes })
      const newVotes = data.fields.votes
      return newVotes
   } catch (error) {
      console.log(error.response.data)
      return null
   }
}
