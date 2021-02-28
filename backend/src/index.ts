import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

const port = 5000

app.use(express.json())

app.post('/vaccineProvider', async (req, res) => {
  const { location, address1, address2, city, state, zip, phone, bostonProvider,  availabilityLink, googleMapsLink, providerWebpage, inStock, vaccinesOffered, firstDoseAvailability, secondDoseAvailability } = req.body;
  const result = await prisma.vaccineProvider.create({
      data: {
          location,
          address1, 
          address2,
          city,
          state,
          zip,
          phone,
          bostonProvider,
          availabilityLink, 
          googleMapsLink, 
          providerWebpage, 
          inStock,
          vaccinesOffered, 
          firstDoseAvailability, 
          secondDoseAvailability
      },
  });
  // console.log("data added");
  res.json(result);
})

// Get all vaccine providers
app.get('/vaccineProviders', async (req, res) => {
  const vaccineProviders = await prisma.vaccineProvider.findMany()
  console.log(vaccineProviders)
  res.json(vaccineProviders)
})

// Get all Boston area vaccine providers
app.get('/bostonVaccineProviders', async (req, res) => {
  const bostonVaccineProviders = await prisma.vaccineProvider.findMany({
    where: {
      bostonProvider: true,
    }
  })
  console.log(bostonVaccineProviders)
  res.json(bostonVaccineProviders);
})

const server = app.listen(port, () =>
console.log(
  `🚀 Server ready at: http://localhost:${port}`,
),
)


// app.put('/vaccineProvider', (req, res) {
//   const { location, address1, address2, city, state, zip, phone, inStock, availabilityLink, googleMapsLink, providerWebpage, vaccinesOffered, firstDoseAvailability, secondDoseAvailability } = req.body;

//   const result = await prisma.vaccineProvider.update({

//   })
//   res.send({
//     data: {
//             location,
//             address1, 
//             address2,
//             city,
//             state,
//             zip,
//             phone,
//             inStock,
//             availabilityLink, 
//             googleMapsLink, 
//             providerWebpage, 
//             vaccinesOffered, 
//             firstDoseAvailability, 
//             secondDoseAvailability
//     },
//   })
// })
// app.delete('/vaccineProvider', async (req, res) => {
//     const deleted = await prisma.vaccineProvider.deleteMany()
//     res.json(deleted);
// })

