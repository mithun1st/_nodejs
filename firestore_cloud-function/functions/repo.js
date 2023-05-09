/*

{
    "id": 3,
    "name": "mr aa",
    "dep": "cse"
}

*/
async function add(db, req) {
    try {
        const doc = await db.collection('student').doc(req.body.dep).collection(req.body.id.toString()).doc('profile').create({
            "id": req.body.id,
            "name": req.body.name,
            "dep": req.body.dep,
        });
        return doc;
    } catch (error) {
        console.log(error);
        return null;
    }
};

async function read(db, req) {
    try {
        const doc = await db.collection('student').doc(req.body.dep.toString()).collection(req.query.id).doc('profile').get();
        const data = doc.data();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

async function update(db, req) {
    try {
        const doc = await db.collection('student').doc(req.query.dep).collection(req.query.id).doc('profile').update({
            "id": req.body.id,
            "name": req.body.name,
            "dep": req.body.dep,
        });
        return doc;
    } catch (error) {
        console.log(error);
        return null;
    }
};

async function del(db, req) {
    try {
        const doc = await db.collection('student').doc(req.query.dep).collection(req.query.id).doc('profile').delete();
        return doc;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = { add, read, update, del };