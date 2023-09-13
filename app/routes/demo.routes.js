module.exports = app =>{
    const demo = require('../controllers/demo.controller');

    let router = require('express').Router();

    //Create a demo
    router.post('/', demo.create);

    //Retrieve all demo
    router.get('/', demo.findAll);

    //Retrive all released demo
    router.get('/released', demo.findAllReleased);

    //Retrieve demo with id
    router.get('/:id', demo.findOne);

    //update a demo with id 
    router.put('/:id', demo.update);

    //Delete a demo with id
    router.delete('/:id', demo.delete);

    //Delete all demos
    router.delete('/', demo.deleteAll);

    app.use('/api/demos', router);
}