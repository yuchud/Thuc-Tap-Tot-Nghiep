module.exports = {
    //host: process.env.DB_HOST,
    host: '172.18.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    dialect: 'mysql'
}
