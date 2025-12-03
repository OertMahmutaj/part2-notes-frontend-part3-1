require('dotenv').config()   // Load environment variables from .env
const mongoose = require('mongoose')

const password = process.env.MONGO_PASSWORD

if (!password) {
  console.error('Error: MONGO_PASSWORD not set in .env')
  process.exit(1)
}

const url = `mongodb+srv://oert64:${password}@maincluster.2b6kbwx.mongodb.net/notes?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    const noteSchema = new mongoose.Schema({
      content: String,
      important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note = new Note({
      content: 'HTML is easy',
      important: true,
    })

    return note.save()
  })
  .then(savedNote => {
    console.log('Note saved:', savedNote)
  })
  .catch(err => {
    console.error('Error:', err.message)
  })
  .finally(() => {
    mongoose.connection.close()
  })
