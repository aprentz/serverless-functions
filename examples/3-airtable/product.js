const result = document.querySelector('.product')

const fetchData = async () => {
   result.innerHTML = `<h2>Loading...</h2>`

   try {
      const id = window.location.search
      const { data: { fields } } = await axios.get(`/api/3-z-complete/${id}`)
      const { descrip, name, price, image } = fields
      result.innerHTML = `
         <img class="product-img"
            src=${image[0].url}
            alt=${name}
         />
         <div class="product-info">
            <h5 class="title">${name}</h5>
            <h5 class="price">$${price}</h5>
            <p class="desc">${descrip}<p>
         </div>
      `

   } catch (error) {
      result.innerHTML = `<h2>${error.response.data}</h2>`
   }

}

fetchData()
