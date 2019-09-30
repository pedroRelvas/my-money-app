//o webserver restful pega os proprios metodos do http (get, put, post, delete...) e aplica semantica a partir, por exemplo do mesmo url,  partir do metodo http que estamos a executar. ele usa esses metodos para ver que tipo de operaçao vai fazer
//neste arquivo começamos a colocar as coisas relativas ao EXPRESS. 

const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')


BillingCycle.methods(['get', 'post', 'put', 'delete'])
//quando faço actualizacao, o proprio serviço restful  retorna o objeto que acabou de atualizar, mas por padrao ele nao retorna o objeto novo, retorna o antigo. Com o new vai retornar o novo.
BillingCycle.updateOptions({new: true, runValidators: true /* por padrao so funciona para post, mas tambem funciona par put*/})
BillingCycle.after('post', errorHandler).after('put', errorHandler)

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json(result[0] || {credit: 0, debt: 0})
        }
    })
}) 

//a exportar
module.exports = BillingCycle

//Em billingCycle.js fez o mapeamento, criou esquemas e exportou o modulo (o billingcycle). O resultado desta exportação está no billingCycleService("o dar o require no billingCycle.js"),e de cima deste modelo aplicamos os metodos que queremos que ele crie e faça, e depois o updateoptions apra melhorar a API.
//