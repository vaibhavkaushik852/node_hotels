const express = require('express');
const router = express.Router();

const Person = require('./../models/person.js'); // (..) bcz model do file piche hai


//POST ROUTE TO ADD A PERSON
router.post('/',async(req,res)=>{
    try{

    const data = req.body; //assuming the request body contain the person data

// create person document using mongoose model
    const newperson = new Person(data);

//save  newperson to the database

    const response =await newperson.save();
    console.log('data saved');
    res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:'internal server occur'});

    }
    

})

//get method to get the function
router.get('/',async(req,res)=>{
    try{
        const data = await Person.find();
         console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
         console.log(err);
        res.status(500).json({err:'internal server occur'});

    }
 });
 

 router.get('/:worktype',async(req,res)=>{
     try{
     const worktype = req.params.worktype; //extract the worktype from url parameter
     if(worktype =='chef' || worktype =='manager'||worktype == 'waiter'){
     const response = await Person.find({work : worktype});
     console.log('response fetched');
     res.status(200).json(response);
     }else{
         res.status(404).json({error : 'invalid worktype'})
     }
     }catch(error){
         console.log(error);
         res.status(500).json({error : 'internal error occur'})
     }
  })
 

// put method to update data


router.put('/:id', async (req,res)=>{
    try {
        const personid = req.params.id; //extract id from url parameter 
        const updatedperson = req.body; //updated data for the person
        const response = await Person.findByIdAndUpdate(personid, updatedperson, {
            new: true, //return the updated document
            runValidators: true,  //run mongoose validators
        });
        console.log('data updated'),
        res.status(200).json(response);
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }

       
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

//delete method to delete person

router.delete('/:id', async(req,res)=>{
    try{
    const personid = req.params.id;
    const response = await Person.findByIdAndDelete(personid);
    if (!response){
        return res.status(404).json({error : 'person not found'});
        console.log('data deleted');
        res.status(200).json({messages : 'person deleted successfully'})
    }
    }catch(err){
        console.log(error);
        res.status(500).json({ error: 'internal server error' });

    }
  

})



 
 
 module.exports = router;