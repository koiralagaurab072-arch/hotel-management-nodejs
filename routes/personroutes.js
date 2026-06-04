const express = require('express');
const route = express.Router();
const person = require('../modules/person');

route.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const savedPerson = await newPerson.save();
    console.log("saved");
    res.status(201).json(savedPerson); //   status 201 for created
  }
  catch (err) {
    console.log("error occurred", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'server error' }); // send error response
  }
});

//get menthod
route.get('/person', async (req, res) => {
  try {
    const persons = await person.find({ age: { $lte: 25 } });
    console.log('data fetched ');
    res.status(201).json(persons);
  } catch (err) {
    console.log('error occur', err);
    res.status(500).json({ error: 'server serror' });
  }
});

route.get('/person/:work', async (req, res) => {
  try {
    const worktype = req.params.work;
    if (worktype == 'chef' || worktype == 'waiter' || worktype == 'manager') {
      const response = await person.find({ work: worktype });
      console.log('data fetched ');
      res.status(201).json(response);
    }
  } catch (err) {
    console.log('error occur', err);
    res.status(500).json({ error: 'server serror' });
  }
});


//update the data 
route.put('/person/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const response = await person.findByIdAndUpdate(id, updatedData, {
      new: true,//return the updated data
      runValidators: true,//run mongoose validation
    })
    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }
    console.log('data has been updated');
    res.status(200).json(response);
  } catch (err) {
    console.error('error has been seen', err);


    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });

    }
    res.status(500).json({ error: 'internal server error' });
  }
})

//delete data
route.delete('/person/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const response = await person.findByIdAndDelete(id);
    if (!response) {
      res.status(404).json({ message: 'person not forund' });
    }
    console.log(`person ${person.id} has been deleted`);
    res.status(200).json(response);
  }catch(err){
    console.log('error occur while deleting',err);
    res.status(500).json({error:"internal server error"});
  }
})

module.exports = route;

