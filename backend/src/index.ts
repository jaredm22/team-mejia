import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// app.get('/vaccineCenters')

app.get('/vaccineCenters', async (res, req) => {
    const posts = await prisma.VaccineCenter.findMany({})
})

const server = app.listen(3001, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3001',
  ),
)