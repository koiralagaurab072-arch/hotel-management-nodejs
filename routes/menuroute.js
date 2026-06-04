const express = require('express');
const route = express.Router();
const menu = require('../modules/menu');

route.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const menuobj = new menu(data);
        const savemenu = await menuobj.save();
        console.log('data saved sucessfully');
        res.status(200).json(savemenu);
    }
    catch (err) {
        console.log('error has been seen');
        res.status(500).json({ error: 'unexpected error has been seen '})
    }
})
route.get('/menu/:taste', async (req, res) => {
    try {
        const tastecategory = req.params.taste;
        if (tastecategory == 'hot' || tastecategory == 'spicy' || tastecategory == 'sweet') {
            const data = await menu.find({ taste: tastecategory });
            console.log('data fetched sucessfully');
            res.status(200).json(data);

        }
    } catch (err) {
        console.log('error has been seen');
        res.status(500).json({ error: 'unexpected error has been seen ' })
    }
})

//update the data
route.put('/menu/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedMenu = req.body;

        const response = await menu.findByIdAndUpdate(id, updatedMenu, {
            new: true,
            runValidators: true,
        })
        if (!response) {
           return res.status(404).json({ error: 'menu not found' });
        }
        console.log('data updated sucessfully');
        res.status(200).json({message:'updated sucessfully'});

    } catch (err) {
        console.log('error has been seen')

        if (err.name === 'ValidationError'){
            console.log('validation error');
            res.status(500).json({error:err.message})
        }
        res.status(500).json({error:err.message});
    }

})

module.exports = route;
