import axios from 'axios'

const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export const LIST_SELECT =
  'id,title,description,price,discountPercentage,rating,stock,brand,category,thumbnail'

export default client