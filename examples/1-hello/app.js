const result = document.querySelector('.result')

const fetchData = async () => {
   try {
      const { data } = await axios.get('/api/1-hello')
      result.textContent = `${data.msg} ${data.name}`
   } catch (error) {
      console.log(error.response)
      result.textContent = error.response.statusText
   }
}

fetchData()