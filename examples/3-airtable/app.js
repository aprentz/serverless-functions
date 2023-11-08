const result = document.querySelector('.result')
// const axios = require('axios')

const fetchProducts = async () => {
   try {
      const { data } = await axios.get('/api/3-airtable')
      const products = data.map((product) => {
         const { id, url, name, price } = product
         return `
            <a class="product" href="product.html?id=${id}">
               <img src=${url} alt=${name} />
               <div class="info">
                  <h5>${name}</h5>
                  <h5 class="price">${price}</h5> 
               </div>
            </a>
         `
      }).join(' ')
      result.innerHTML = products
      console.log(data)
   } catch (error) {
      result.innerHTML = '<h4>There was an error!</h4>'
   }
}

fetchProducts()