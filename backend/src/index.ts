import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

const port = 5000

app.use(express.json())

// app.get('/vaccineCenters')

// app.get('/', async (req, res) => {
//     console.log("Server is running ya fool")
//     res.end()
// })

app.get('/vaccineCenters', async (req, res) => {
    const vaccineCenters = await prisma.vaccineCenter.findFirst()
    console.log(vaccineCenters)
    res.json(vaccineCenters)
})

const server = app.listen(port, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${port}`,
  ),
)