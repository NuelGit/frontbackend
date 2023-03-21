import { MongoClient } from 'mongodb';

let db;

async function ConnectDb(cb) {

    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.vrce1rl.mongodb.net/?retryWrites=true&w=majority`)
    await client.connect();
     db = client.db('blog-backend')
    cb()
}

export  {
    db, ConnectDb
}