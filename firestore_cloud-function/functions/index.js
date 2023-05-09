const functions = require("firebase-functions");
const cors = require("cors");
const express = require("express");
const repo = require("./repo");

//--from firebase
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hpos-375809-default-rtdb.firebaseio.com"
});
//--/

const app = express();
const db = admin.firestore();

app.use(express.json());
app.use(cors({ origin: true }));

const port = 3000;

app.get("/", (req, res) => {
    return res.status(200).send("Hello Hypos");
});

app.post("/add", (req, res) => {
    (async () => {
        if (await repo.add(db, req) == null) {
            return res.status(400).send(false);
        }
        else {
            return res.status(200).send(true);
        }
    })();
});

app.get("/read", (req, res) => {
    console.log(req.query.id);
    (async () => {
        const response = await repo.read(db, req);
        if (response == null) {
            return res.status(400).send(false);
        }
        else {
            return res.status(200).send(response);
        }
    })();
});

app.put("/update", (req, res) => {
    (async () => {
        const response = await repo.update(db, req);
        if (response == null) {
            return res.status(400).send(false);
        }
        else {
            return res.status(200).send(response);
        }
    })();
});

app.delete("/delete", (req, res) => {
    (async () => {
        const response = await repo.del(db, req);
        if (response == null) {
            return res.status(400).send(false);
        }
        else {
            return res.status(200).send(response);
        }
    })();
});


app.listen(port, () => console.log(`server listening on port number ${port}`));
exports.studentapp = functions.https.onRequest(app);

