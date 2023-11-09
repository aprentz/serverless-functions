const form = document.querySelector('.form')
const emailInput = document.querySelector('.email-input')
const alert = document.querySelector('.alert')
alert.style.display = 'none'

form.addEventListener('submit', async (e) => {
   e.preventDefault()
   form.classList.add('loading')
   alert.style.display = 'none'
   const email = emailInput.value
   try {
      await axios.post('/api/6-newsletter', { email })
      form.innerHTML = '>h4>'
   } catch (error) {

   }
})