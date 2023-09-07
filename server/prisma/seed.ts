import { db } from '../src/lib/db'

const todo = async () => {
  const campaign = await db.campaign.createMany({
    data: {
      code: 'campaign1',
      begin_date: randomDate(),
      end_date: randomDate(),
      questions: [],
    },
  })
}

function generatePhoneNumber(): string {
  const prefix = '09'
  let phoneNumber = prefix

  for (let i = 2; i < 10; i++) {
    const randomDigit = Math.floor(Math.random() * 10)
    phoneNumber += randomDigit.toString()
  }

  return phoneNumber
}
function randomDate() {
  const today = new Date()
  const hundredYearsAgo = new Date()
  hundredYearsAgo.setFullYear(today.getFullYear() - 70)
  const startDate = hundredYearsAgo.getTime()
  const endDate = today.getTime()
  const randomDate = new Date(startDate + Math.random() * (endDate - startDate))
  const year = randomDate.getFullYear()
  const month = parseInt(String(randomDate.getMonth() + 1).padStart(2, '0'))
  const day = parseInt(String(randomDate.getDate()).padStart(2, '0'))
  // return `${year}-${month}-${day}`;
  return new Date(year, month, day)
}
