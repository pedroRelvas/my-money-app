const port = 3003 //onde roda o backend
//onde roda o frontend


//todos estes requires são feitos a instancias unicas
const bodyParser = require('body-parser') //middlewares para tratamento de requisição, vai fazer o parser no corpo da requisição para entregar o objeto pronto
const express = require('express') 
const server = express() //aqui retorna sempre um novo servidor
const allowCors = require('./cors')
const queryParser = require('express-query-int') //para converter string em numerico


//middleware vais er interceptado pela requisição
//uurlencoded é padrão quando um formulario é submetido. modo extended para interpretar mais dados que o padrão
//isto o que faz? para toda a requisição que chega use o bodyparser para interpretar quando vier no formato urlencoder
server.use(bodyParser.urlencoded({ extended: true }))
//quando no corpo da requisição vier um json
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})

module.exports = server