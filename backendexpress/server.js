import fs from 'fs'
import admin from 'firebase-admin'
import express from 'express'
import { db, ConnectDb } from './db.js'
import { fileURLToPath } from 'url'
import path from 'path'
import 'dotenv/config'

const __filename =fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



const credentials = JSON.parse(
    fs.readFileSync('./credential.json')
)
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, './build')))

app.get(/^(?!\/api).+/, (req, res) =>{
    res.sendFile(path.join(__dirname, './build/index.html'))
} )

app.use(async (req, res, next) =>{
    const { authtoken } = req.headers

    if (authtoken) {

        try{
            req.user = await admin.auth().verifyIdToken(authtoken)
        }catch (e){
            return res.sendStatus(400)
        }
    }

    req.user = req.user || {}

    next()
})

app.get('/api/articles/:name', async (req, res) =>{
    const { name} = req.params;
    const { uid } = req.user

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    const article = await db.collection('articles').findOne({name})
    if (article){ 
        const upvoteIds = article.upvoteIds || []
        article.canUpvote = uid && !upvoteIds.includes(uid)
        res.json(article)
    }else{
        res.sendStatus(404)
    }
})

app.use((req, res, next) =>{
    if(req.user){
        next()
    } else {
        res.sendStatus(401)
    }
})

app.put('/api/articles/:name/upvote', async(req, res) =>{
    const {name} = req.params;
    const {uid} = req.user

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    // const article = articlesInfor.find(a => a.name ===name)

    const article = await db.collection('articles').findOne({name})
    if (article){ 
        const upvoteIds = article.upvoteIds || []
        const canUpvote = uid && !upvoteIds.includes(uid)

        if(canUpvote){

            await db.collection('articles').updateOne({name}, {$inc:{upvotes: 1 },
            $push:{upvoteIds: uid}})
        }

        const updateArticle = await db.collection('articles').findOne({name})
        res.json(updateArticle)

        // article.upvotes += 1
        // res.send(`The ${name} article now has ${article.upvotes} upvotes!! `)
    }else {
        res.send("doesn't exist ")
    }
})

app.post('/api/articles/:name/comments', async (req, res) =>{
    const{name} = req.params
    const{text}= req.body
    const {email} = req.user
    
    // const article = articlesInfor.find(a => a.name ===name)

    // const client = new MongoClient('mongodb://127.0.0.1:27017')
    // await client.connect();
    // const db = client.db('blogbackend_db')

    await db.collection('articles').updateOne({name}, {
        $push:{comments :{postedBy: email, text }},
    })

    const article = await db.collection('articles').findOne({name})
    
    if(article){
        // article.comments.push({postedBy, text})
        res.json(article)
    } else{
        res.send("doesn't exist get out")
    }
})

const PORT = process.env.PORT || 8000


ConnectDb (() =>{
    console.log('Successfully connected to Database')
    
    app.listen(PORT, ()=>{
        console.log('Server is listening on port ' + PORT)

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