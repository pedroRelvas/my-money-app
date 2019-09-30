//mapeamento do nosso objeto. mongodb é um banco sem esquema. moongoose aplica vlidaçao

const restful = require('node-restful')
//buscar a referencia mongoose no node-restful
const mongoose = restful.mongoose

//3 esquemas
//esquema relacionado ao credito
const creditSchema = new mongoose.Schema({
    //credito tem os seguintes atributos:
    name: { type: String, /*brigatório informar o nome do credito*/ required: true},
    value: { type: Number, min: 0, required: true }
})

//esquema relacionado ao débito

const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito!'] },
    status: { type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
    })
//esquema de ciclo de pagamrnto

const billingCycleSchema = new mongoose.Schema({
    name : { type: String, required: true },
    month: { type: Number, min: 1, mas: 12, required: true},
    year: { type: Number, min: 1970, max: 2100, required: true },
    credits: [creditSchema],
    debts: [debtSchema]
})

//exportar o esquema para utilizar em outro modulo
module.exports = restful.model('BillingCycle', billingCycleSchema)