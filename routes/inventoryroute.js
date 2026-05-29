const express = require('express');
const route = express.Router();
const inventory = require('../modules/inventory');

route.post('/inventory', async (req, res) => {
    try {
        const data = req.body;
        const inventoryobj = new inventory(data);
        const saveinventory = await inventoryobj.save();
        console.log('data saved sucessfully');
        res.status(200).json(saveinventory);
    } catch (err) {
        console.error('error has been seen', err);
        res.status(500).json({ error: 'internal server error' });
    }

});

route.get('/inventory/:type', async (req, res) => {
    try {
        const data = req.params.type;
        if (data == 'ketchup' || data == 'soap' || data == 'masala' || data == 'medicine') {
            const response = await inventory.find({ type: data });
            console.log('data fetched sucessfully');
            res.status(200).json(response);
        }
    } catch (err) {
        console.log('error has been seen ', err);
        res.status(500).json({ error: 'server error'});
    }
})

//update inventory

route.put('/inventory/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const updatedData=req.body;
        const response = await inventory.findByIdAndUpdate(id,updatedData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'inventory not found'});
        }
        console.log('data has been updated');
        res.status(201).json(response);
    }catch(err){
        if(err.name==='validationError'){
            return res.status(400).json({error:err.message});
        }
        console.error('error has been seen');
        res.status(500).json({error:message.err});
    }
})

//delete inventory

route.delete('/inventory/:id',async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await inventory.findByIdAndDelete(id);
         if(!response){
            return res.status(404).json({error:'inventory not found'});
        }
        console.log('data has been updated');
        res.status(201).json(response);
    }catch(err){
          if(err.name==='validationError'){
            return res.status(400).json({error:err.message});
        }
        console.error('error has been seen');
        res.status(500).json({error:message.err});
    }

})
module.exports=route;