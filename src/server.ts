import express from 'express'
import { categoriesRoutes } from './routes/categories.routes'
import { specificationsRoutes } from './routes/specification.routes'

const app = express()
app.use(express.json())

app.use("/categories", categoriesRoutes)
app.use("/specifications", specificationsRoutes)

app.post("/courses", (request, response) => {
  const { name } = request.body;

  return response.json({ name })
})


app.listen(3000, () => console.log("Server is running!"))