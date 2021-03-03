const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

//url where mongodb server can be accessed
const url = 'mongodb://localhost:27017';
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
    //assert checks. This check is error is equal to null
    assert.equal(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({ "name": "Uthappizza", "description": "test description"}, (err, result) => {
        assert.equal(err, null);
        console.log("After insert:\n")
        console.log(result.ops)

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            })
        })
    })
});