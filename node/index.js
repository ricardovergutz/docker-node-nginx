const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Wesley')`
connection.query(sql)
// connection.end()


app.get('/', async (req,res) => {
    let ret = '<h1>Full Cycle Rocks!</h1>';
    await connection.query("SELECT * FROM people").on('result', function(row){
        ret += `<p>${row.id} - ${row.name}</p>`;
        console.log(row);
    }).on('end', function(){
        res.send(ret);
    });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})