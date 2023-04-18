const express = require('express')
const dotenv = require('dotenv');
const cors = require("cors");
const db = require("./utils/db");
const homeData = require("./models/HomeData");
const app = express()
app.use(express.json());
dotenv.config({ path: './.env' });
const port = process.env.PORT || 7000;

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declarationd

async function insertData(req, res) {
    try {
        await db.db.connect();
        const homedata = new homeData.Homedata({
            noOfLedGlowing : req.body.noOfLedGlowing,
            noOfPeopleInRoom : req.body.noOfPeopleInRoom
        });
        await homedata.save();
        await db.db.disconnect();
        res.send({ isInserted: true })
    } catch (error) {
        res.send({ isInserted: false, error: error });
    }
}

async function getHomeData(req, res) {
    await db.db.connect()
    try {
        const data = await homeData.Homedata.findOne({},{}, {sort : {createdAt : -1}});
        res.json(data);
        
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
    await db.db.disconnect();
    // console.log(data);
    // res.send(JSON.stringify(data));
    
}


app.post('/insertdata', (req, res) => {
    insertData(req, res);
});

app.get('/getdata', (req, res)=>{
    getHomeData(req, res);
})

app.get('/', async (req, res) => {
    res.status(200).send({ msg: "Connected to Home Management API!!" });
})

app.get('/home', async (req, res) => {
    res.status(200).send({ msg: "Connected to Home Management API!!" });
})
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})