const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(cors())
const API_KEY = 'AIzaSyAQBKdQPR3ykLIcgeOtlKOu0uVvVam0dWg'
const SEARCH_ENGINE_ID = 'f798cb6a3ef5c47d2'

app.use(express.json())

app.get('/search', async (req, res) => {
  const query = req.query.q
  const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`

  try {
    const response = await axios?.get(apiUrl)
    res.json(response.data)
  } catch (error) {
    console.error('Error fetching search results', error)
    console.error('API URL:', apiUrl)
    console.error('API Response:', error.response.data)
    res.status(500).json({ error: 'An error occurred while fetching search results' })
  }
})

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GET request successful',
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
