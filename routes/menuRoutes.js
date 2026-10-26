const express = require('express');
const router = express.Router();


const Menuitem = require('./../models/menu.js');


 //post route to add menu
 router.post('/', async(req,res)=>{
    try{
    const data = req.body;
    const newmenu = new Menuitem(data);
    const response = await newmenu.save();
    console.log('data saved');
    res.status(200).json(response);


    }catch(err){
        console.log(err);
        res.status(500).json({err: 'internal error '});

    }
 })

 router.get('/',async(req,res)=>{
    try{
        const data = await Menuitem.find();
        console.log('fetched');
    res.status(200).json(data);


    }catch(err){
        console.log(err);
        res.status(500).json({err: 'internal error '});

    }

 })

 router.get('/:tastetype',async(req,res)=>{
      try{
      const tastetype = req.params.tastetype; //extract the worktype from url parameter
      if(tastetype =='sweet' || tastetype =='sour'||tastetype == 'spicy'){
      const response = await Menuitem.find({taste : tastetype});
      console.log('response fetched');
      res.status(200).json(response);
      }else{
          res.status(404).json({error : 'invalid tastetype'})
      }
      }catch(error){
          console.log(error);
          res.status(500).json({error : 'internal error occur'})
      }
   })
  
 
 module.exports = router;