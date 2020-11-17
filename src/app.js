const path = require("path")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const express = require("express")
const hbs = require("hbs")

const log = console.log



const app = express()
const port = process.env.PORT || 3000

// define paths
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// setip handlebars engine and views location
app.set("views", viewsPath)
hbs.registerPartials(partialPath)
app.set("view engine", "hbs")

// Setup static directory
app.use(express.static(publicDir))


app.get("", (req, res)=>{
    res.render('index', {
        title: "Weather app",
        name: "Andrew"
    })
})

app.get("/about", (req, res)=>{
    res.render("about", {
        title: "About me",
        name: "Andrew"
    })
})
app.get("/help", (req, res)=>{
    res.render("help", {
        title: "Help page",
        name: "Alyan"
    })
})

app.get("/weather", (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must provide a query"
        })
    }
    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        if(error){
          return res.send({
              error
          })
        }
          forecast(lat, lon, (error, {desc, temp, feelslike, text} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            //   log("In " + location + ": " + desc + " : " + " The temperature is " + temp + " and it feels like " + feelslike)
            res.send({
                location,
                desc,
                temp,
                feelslike,
                text
            })
        })
      })
})

app.get("/products", (req, res)=>{

    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Alyan",
        errMessage: "Help article not found"
    })
})


app.get("*", (req, res)=>{
    res.render("404", {
        title: "404",
        name: "Alyan",
        errMessage: "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server running")
})