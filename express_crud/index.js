/*
 >mkdir test_crud
 >cd test_crud
 
 >npm install express
 //create index.js and write code
 
 >node index.js
*/


const express = require('express');
const fnc = require('./service');

const app = express();
app.use(express.json());


const port = 3000;


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
app.get("/", (req, res) => {
    return res.status(202).send("Hello World");
});

//test
app.get("/page/test", (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.headers);
    res.status(210);
    return res.send(req.query.p1 + "\n" + req.query.p2 + "\n sum=" + fnc.add(parseInt(req.query.p1), parseInt(req.query.p2)) + "\n" + JSON.stringify(req.body) + "\n" + JSON.stringify(req.headers));
});

//#####################CRUD OPERATION####################

//create
app.post("/create", (req, res) => {

    list.push(new Students(req.body.id, req.body.name, req.body.result, req.body.roll, req.body.isMale));

    let data = { "status": true, "numOfData": list.length };

    res.status(201);
    return res.send(data);
});

//read
app.get("/read", (req, res) => {
    let id = req.query.id
    console.log(id);

    if (list.findIndex((e) => e.id == id) == -1) {
        res.status(400);
        return res.send({ "status": false });
    }

    let stu = list.find((e) => e.id == id);
    res.status(201);
    return res.send(stu);
});


//read all
app.get("/read-all", (req, res) => {
    res.status(201);
    return res.send(list);
});

//update
app.put("/update", (req, res) => {
    let id = req.query.id

    if (list.findIndex((e) => e.id == id) == -1) {
        res.status(400);
        return res.send(JSON.stringify({ "status": false }));
    }

    let index = list.findIndex((e) => e.id == id);
    list[index] = req.body;

    res.status(201);
    return res.send({ "status": true });
});

//delete
app.delete("/delete", (req, res) => {
    let id = req.query.id


    if (list.findIndex((e) => e.id == id) == -1) {
        res.status(400);
        return res.send({ "status": false });
    }

    let index = list.findIndex((e) => e.id == id);
    list.splice(index, 1);
    res.status(201);
    return res.send({ "status": true });
});

//delete all
app.delete("/delete-all", (req, res) => {
    list.splice(0, list.length);
    res.status(201);
    return res.send({ "status": true });
});


app.listen(port, () => console.log(`listening on ${port} port`));

