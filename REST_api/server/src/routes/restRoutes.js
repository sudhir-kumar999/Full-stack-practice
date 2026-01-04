import express from "express"
const router = express.Router()
import RestAPI from "../models/userModels.js"


router.get("/read",async(req , res)=>{
    const data = await RestAPI.find()


    res.json({
        success:true,
        message:"data fetched",
        data:data
    })
})

router.post("/post" , async(req , res)=>{
    const {name , price , rating , description , image} = req.body;
    const data = new RestAPI({
        name,
        price,
        rating,
        description,
        image
    })
    await data.save()
    res.json("data receive")
})


export default router