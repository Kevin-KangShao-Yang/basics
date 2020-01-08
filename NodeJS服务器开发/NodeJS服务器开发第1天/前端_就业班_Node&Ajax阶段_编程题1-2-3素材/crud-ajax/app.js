const express = require('express')
const path = require('path')
const morgan = require('morgan')
const employeeRouter = require('./routes/employee')

const hostname = '127.0.0.1'
const port = 3000

const app = express()

app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

app.use('/public', express.static(path.join(__dirname, './public/')))

app.use(express.static(path.join(__dirname, './views/')))

app.use('/employees', employeeRouter)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
