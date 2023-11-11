
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
      form.innerHTML = `
      <h4 class="success">Success! Please check your email</h4>
      `
   } catch (error) {
      alert.style.display = 'block'
      if (error?.response?.data?.response?.text) {
         const responseObject = JSON.parse(error.response.data.response.text)
         const errorMsg = responseObject.detail.includes('is already a list member') ?
            responseObject.detail.replace('Use PUT to insert or update list members.', '') :
            responseObject.detail
         alert.textContent = errorMsg
      }
      else {
         alert.textContent = error.response.data
      }
   }
   form.classList.remove('loading')
})


