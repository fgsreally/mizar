const { debugMiddle } = require('mizar-node-debugger')
const express = require('express')
const app = express()
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})
app.use(express.json())

const a = debugMiddle(app, 'test.js', {})
const server = app.listen(3000, () => {
  console.log('start server..')
})

server.on('upgrade', a) // optional: upgrade externally
