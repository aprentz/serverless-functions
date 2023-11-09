// it takes few minutes

const form = document.querySelector('.form')
const input = document.querySelector('.form-input')
const alert = document.querySelector('.alert')
const result = document.querySelector('.result')
alert.style.display = 'none'

form.addEventListener('submit', (e) => {
   e.preventDefault()
   const city = input.value
   if (city) {
      getWeatherData(city)
   }
})

const getWeatherData = async (city) => {
   if (city.toLowerCase() === 'melbourne') {
      city = `melbourne,au`
   }
   alert.style.display = 'none'
   try {
      const { data } = await axios.post('/api/5-weather', { city })
      const { name } = data
      const { temp_max: max, temp_min: min, feels_like, temp } = data.main
      const { description } = data.weather[0]
      const { country } = data.sys
      console.log(max, min, feels_like, temp,)
      result.innerHTML = `
         <article class="card">
            <h3>${name}, ${country}</h3>
            <p>${description}</p>
            <p>min temp: ${min}&#8451</p>
            <p>max temp: ${max}&#8451</p>
            <p>feels like: ${feels_like}&#8451</p>
         </article>
      `

   } catch (error) {
      alert.style.display = 'block'
      alert.textContent = `Can not find weather data for city: "${city}"`
   }
}