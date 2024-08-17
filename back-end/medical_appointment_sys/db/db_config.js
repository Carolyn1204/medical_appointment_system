
const mysq2 = require('mysql2')

const db = mysq2.createPool({
host: '127.0.0.1',
user: 'root',
password: 'root2024',
database: 'medical_appoitment_system',
})

module.exports = db