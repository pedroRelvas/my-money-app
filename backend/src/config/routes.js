//referencia do express
const express = require('express')

//receber o server como parametro (do server.js)
module.exports = function(server) {
    //Defninir URL base par todas as rotas
    const router = express.Router()
    
    //Criamos um router para definir um url base, que é a /api. Logo quando ele chamar uma requisição com /api ele vai chamar o router
    server.use('/api', router)

    //Rotas de ciclo de pagamento. vem a partir do nosso service
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    //registei este router a partir do metodo register do node-restful, registamos todos os webservices rest dentro do /billingCycles
    //assim ele cria tudo o que definimos dentro dos métodos do billingcycles: get, post, put e delete
    BillingCycle.register(router, '/billingCycles')

    //para acessar à api de billingCycles temos que primeiro colocar /api 


}