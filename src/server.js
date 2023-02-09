const app = require('./app')
const {connectMongo} = require('./db/connection')

const Port = process.env.Port || 3000

const start = async () => {
  try {
    await connectMongo()
    app.listen(Port, () => {
      console.log("Database connection successful. Use our API on port: 3000")
    })
  } catch (error) {
    console.error('Error at server launch: ', error)
    process.exit(1)
  }
} 

start()


