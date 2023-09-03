import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { event, fixtures, stats } from "./controllers/fixtures.js"

dotenv.config()

const { RAPID_API_KEY, RAPID_API_HOST, PORT } = process.env

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/fixtures/:date", async (req, res) => {
    const games = await fixtures(RAPID_API_KEY, RAPID_API_HOST, req.params.date)
    console.log({...games})

    return res.json({ ...games })
})

app.get("/stats/:eid", async (req, res) => {
    const stat = await stats(RAPID_API_KEY, RAPID_API_HOST, req.params.eid)
    console.log({...stat})

    return res.json({ ...stat })
})

app.get("/event/:date/:league_id/:eid", async (req, res) => {
    const game = await event(RAPID_API_KEY, RAPID_API_HOST, req.params.date, req.params.league_id, req.params.eid)
    console.log({...game})

    return res.json({ ...game })
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Connection at ${PORT} is successful.`)
})