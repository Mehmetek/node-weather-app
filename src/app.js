const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const { allowedNodeEnvironmentFlags } = require("process")

const app = express()

app.use(express.static(path.join(__dirname,"../public")))
app.set("view engine","hbs")
app.set("views", path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname,"../templates/partials"))

app.get("",(req,res) => {
    res.render("index",{
        title: "Weather App",
        name: "Mehmet TEK"
    })
})

app.get("/about",(req,res) => {
    res.render("about",{
        title: "About Page",
        name: "Mehmet TEK"
    })
})

app.get("/help",(req,res) => {
    res.render("help",{
        text:"Perfect file",
        title: "Help Page",
        name: "Mehmet TEK"
    })
})
app.get("/weather", (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } 
        
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature: forecastData,
                location,
                address:req.query.address
            })
        })
    })
    
    
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        name:"Mehmet TEK",
        errorMessage:"Help article not found"
    })
})

app.get("*",(req,res) => {
    res.render("404",{
        title:"404",
        name: "Mehmet TEK",
        errorMessage:"page not found"
    })
})

app.listen(3000, () => {
    console.log("Server is running on 3000 Port")
})