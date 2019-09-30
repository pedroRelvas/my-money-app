//exportamos o server do serve.js e passámos o server para o routes, como podemos ver na linha 4. para depois no routes.js enviar o server
const server = require('./config/server')
require('./config/database')
require('./config/routes')(server)