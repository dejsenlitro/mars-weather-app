import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/sols', {useNewUrlParser: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected')
})

const solSchema = new mongoose.Schema({
  sol: {
    type: String,
    unique: true,
  },
  atmosphericTemperate: {
    average: Number,
    minimum: Number,
    maximum: Number,
    measurementsCount: Number,
  },
  horizontalWindSpeed: {
    average: Number,
    minimum: Number,
    maximum: Number,
    measurementsCount: Number,
  },
  pressure: {
    average: Number,
    minimum: Number,
    maximum: Number,
    measurementsCount: Number,
  },
})

export const solModel = mongoose.model('SolModel', solSchema)
