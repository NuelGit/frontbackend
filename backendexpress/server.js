import express from 'express'
import { db, ConnectDb } from './db.js'


const app = express()
app.use(express.json())

app.get('/api/articles/:name', async (req, res) =>{
    const { name} = req.params;

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    const article = await db.collection('articles').findOne({name})
    if (article){ 
        res.json(article)
    }else{
        res.sendStatus(404)
    }
} )

app.put('/api/articles/:name/upvote', async(req, res) =>{
    const {name} = req.params;

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    // const article = articlesInfor.find(a => a.name ===name)

    await db.collection('articles').updateOne({name}, {$inc:{upvotes: 1 },})

    const article = await db.collection('articles').findOne({name})
    
    if(article){
        res.json(article)
        // article.upvotes += 1
        // res.send(`The ${name} article now has ${article.upvotes} upvotes!! `)
    }else {
        res.send("doesn't exist ")
    }
})

app.post('/api/articles/:name/comments', async (req, res) =>{
    const{name} = req.params
    const {postedBy, text}= req.body
    
    // const article = articlesInfor.find(a => a.name ===name)

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    await db.collection('articles').updateOne({name}, {$push:{comments :{postedBy, text}},})

    const article = await db.collection('articles').findOne({name})
    
    if(article){
        // article.comments.push({postedBy, text})
        res.json(article)
    } else{
        res.send("doesn't exist get out")
    }
})
ConnectDb (() =>{
    console.log('Successfully connected to Database')
    
    app.listen(8000, ()=>{
        console.log('Server is listening on port 8000')

})

})


// let articlesInfor = [{

//     name: 'learn-react',
//     upvotes: 0,
//     comments: [],
//    },

// {
//     name: 'learn-mongodb',
//     upvotes: 0,
//     comments: [],
// },

// {
//     name: 'learn-node',
//     upvotes: 0,
//     comments: [],
// },
// {
//     name: 'mongoDb',
//     upvotes: 0,
//     comments: [],
// },

// {
//    name: 'learn-resume',
//     upvotes: 0,
//     comments: [],
// }]