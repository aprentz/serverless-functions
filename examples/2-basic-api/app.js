const result = document.querySelector('.result')

const fetchData = async () => {
   try {
      const { data } = await axios.get('/api/2-basic-api')
      const products = data.map((product) => {
         const { image, name, house } = product

         return `
            <article class="product">
               <h5 class="name">${name}</h5>
               <img src=${image} alt=${name} />
               <h5 class="house">${house}</h5>
            </article>
            `
      })

      result.innerHTML = products

   } catch (error) {
      console.log(error)
      result.innerHTML = `<h4>There was an error. Please try again later</h4>`
   }
}

fetchData()