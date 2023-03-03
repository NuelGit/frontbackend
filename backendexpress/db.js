import { MongoClient } from 'mongodb';

let db;

async function ConnectDb(cb) {

    const client = new MongoClient('mongodb://127.0.0.1:27017')
    await client.connect();
     db = client.db('blogbackend_db')
    cb()
}

export  {
    db, ConnectDb
}