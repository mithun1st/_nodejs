/*
 >mkdir test_crud
 >cd test_crud
 
 >npm install express
 //create index.js and write code
 
 >node index.js
*/

const express = require('express');

const app = express();
app.use(express.json());

const port = 2222;

console.log('run');



class Students {
    constructor(id, name, result, roll, isMale) {
        this.id = id,
            this.name = name,
            this.result = result,
            this.roll = roll,
            this.isMale = isMale
    };
}
let list = Array();



//route
app.get('/', (req, res) => {
    return res.status(202).send("Hello World");
});

//test
app.get('/test', (req, res) => {
    console.log(req.query.p1);
    console.log(req.query.p2);
    console.log(req.body);
    return res.status(200).send(JSON.stringify(req.body)+req.query.p1+req.query.p2);
});


//create
app.post('/create', (req, res) => {

    list.push(req.body);

    let data = { 'status': "success", "numOfData": list.length };
    res.status(201);
    return res.send(JSON.stringify(data));
});


//read
app.get('/read', (req, res) => {
    let id = req.query.id

    let stu = list.find((e) => e.id == id);



    if (list.findIndex((e)=>e.id==id)==-1) {
        res.status(400);
        return res.send(JSON.stringify({ "status": 'not found' }));
    }
    res.status(201);
    return res.send(JSON.stringify(stu));
});


//read all
app.get('/read-all', (req, res) => {

    

    res.status(201);
    return res.send(JSON.stringify(list));
});

//update
app.put('/update', (req, res) => {
    let id = req.query.id

    let index = list.findIndex((e) => e.id == id);
    list[index] = req.body;
    
    if (list.findIndex((e)=>e.id==id)==-1) {
        res.status(400);
        return res.send(JSON.stringify({ "status": 'not found' }));
    }
    res.status(201);
    return res.send(JSON.stringify({ "status": 'success' }));
});


//delete
app.delete('/delete', (req, res) => {
    let id = req.query.id

    let index = list.findIndex((e) => e.id == id);
    list.splice(index, 1);

    if (list.findIndex((e)=>e.id==id)==-1) {
        res.status(400);
        return res.send(JSON.stringify({ "status": 'not found' }));
    }
    res.status(201);
    return res.send(JSON.stringify({ "status": 'success' }));
});

//delete all
app.delete('/delete-all', (req, res) => {
    list.splice(0, list.length);
    
    res.status(201);
    return res.send(JSON.stringify({ "status": 'success' }));
});




app.listen(port, () => console.log(`listening on ${port} port`));
