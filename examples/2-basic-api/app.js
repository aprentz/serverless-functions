const result = document.querySelector('.result')

const fetchData = async () => {
   try {
      const { data } = await axios.get('/api/2-basic-api')
      const products = data.map((product) => {
         const { image, name, house } = product

         return `
            <article class="product">
               <img src=${image} alt=${name} />
               <div class="info">
                  <h5>${name}</h5>
                  <h5 class="price">${house}</h5>
               </div>
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