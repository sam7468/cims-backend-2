import express from 'express'
import bodyParser from 'body-parser'
import cimsRouter from './routes/cims.js'
import mongoose from 'mongoose'
import jsonwebtoken from 'jsonwebtoken'
// import dotenv from "dotenv"
import cors from 'cors'
import { Comp } from "./model/compSchema.js"
import { getCountries } from 'country-state-picker'
import fetch from "node-fetch"
// dotenv.config()

const db = "mongodb+srv://dbUser:dbUserPassword@cluster0.4csc4.mongodb.net/ERP?retryWrites=true&w=majority"
mongoose.connect(db).then(() =>
    console.log("Connection Successfull")
).catch((err) => console.log('err'))

const app = express()
const secret_token = '6850cc6ab29180f03f647c9b7ff331298038b2cd9bf71980f87bfd547e0da37ac60c4c5d7f7136f81b81496a741f496ea3e528b70755bcf020874e0ef01446db'

app.use(cors()) 
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/cims', cimsRouter)

app.post('/login', (req, res)=>{
    const user = {name: 'dummyuser'}
    const token = jsonwebtoken.sign(user,secret_token, {expiresIn: '3600s'})
    res.json({ Token: token})

})

app.get('/location', async (req, res)=>{
    const pincode = req.headers.pincode
    const country = req.headers.country
    
    const url = `https://api.worldpostallocations.com/pincode?postalcode=${pincode}&countrycode=${country}`
    const fetch_res = await fetch(url)
    const location = await fetch_res.json()
    console.log(location,"for state unf")
    //new
    const state = location.result[0] ? location.result[0].state : ""

        const districts = location.result.reduce(function(result, current) {
            result[current.district] = result[current.district] || [];
            result[current.district].push(current.postalLocation);
            return result;
        }, {})

    const data = new Object({
        state,
        districts
    })
    
    res.json(data)
})

app.get('/countries', async (req, res)=>{
    const countries = getCountries()
    res.json(countries)
})

//new
app.get('/getclientinfo',async(req,res)=>{
    try {
        const clientId = req.headers['id']        
        const Comps = await Comp.find({_id:clientId});
        res.send(Comps)
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


app.use('/', (req, res) => {
    res.send("HomePage")
})

app.listen(4000, () => console.log("Server running on 4000..."))