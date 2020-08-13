const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express configs
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Alexandra Sidorov'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Alexandra Dudnyk'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Alexandra Sidorov'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'you need privide the address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
       if(error){
         return res.send({error})
       }
        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                 return res.send({error})
            }
            res.send({
                location,
                forecastData:forecastData,
                adress:req.query.address
            })
        })
    })
})
app.get('/products',(req ,res)=>{
    
    if(!req.query.search){
         return res.send({
            error:'Error!!!!'
        })
    }
    //console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404 page',
        title404: 'Help Article not found',
        name:'Alexandra Sidorov'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        title404:'Page not found',
        name:'Alexandra Sidorov'
    })
})
app.listen(3000, ()=>{
    console.log('Server is Up on port 3000')
})