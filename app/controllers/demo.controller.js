const db = require('../models');
const Demo = db.demo;
const Op = db.Sequelize.Op;


//create a demo
exports.create = (req, res) => {
    //validate input title
    if (!req.body.title){
        res.status(400).send({
            message:'Content can not be empty!'
        });
        return;
    }
    //Create a demo object
    const demo = {
        title: req.body.title,
        description: req.body.description,
        isReleased: req.body.isReleased ? req.body.isReleased : false
    };

    //Save demo in DB
    Demo.create(demo)
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while creating the Demo"
            });
        });
};

exports.findAll = (req, res) => { 
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}`}} : null;

    Demo.findAll({where: condition})
        .then(data => {
            res.send(data);
        }).catch(err=>{
            res.status(500).send({
                message : err.message || "some error occured when retrieving demos."
            });
        });
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Demo.findByPk(id)
        .then(data=>{
            if(data){
                res.send(data);
            }else {
                res.status(404).send({message: `cannot find the demo with id = ${id}`})
            }
        }).catch(err=>{
            res.status(500).send({message:`error retrieving demo with id = ${id}`})
        })

}

exports.update = (req, res) => {
    const id = req.params.id;

    Demo.update(req.body, { where: {id:id}})
        .then(num=>{
            if(num == 1){
                res.send({
                    message: 'Demo was updated sucessfully'
                })
            } else {
                res.send({
                    message: `Cannot update Demo with id=${id}. Maybe Demo was not found or sent information is empty!`
                })
            }
        }).catch(err=>{
            res.status(500).send({
                message: `Error updating Demo with id = ${id}`
            })
        })
}

exports.delete = (req, res) => {
    id = req.params.id;

    Demo.destroy({where: {id:id}}).then(num=>{
        if(num == 1){
            res.send(`Demo with id ${id} was deleted successfully`)
        } else {
            res.send(`Cannot delete Demo with id ${id}, Maybe demo wasn't found!`)
        }
    }).catch(err=>{
        res.status(500).send(`Could not delete demo with id ${id}`)
    })

}

exports.deleteAll = (req, res) => {
    Demo.destroy({
        where:{},
        truncate:false
    }).then(nums =>{
        res.send({message: `${nums} demos were deleted successfully`})
    }).catch(err =>{
        res.status(500).send({message: err.message || 'Some error occured when deleting the demos'})
    }
    )
}

exports.findAllReleased = (req, res) => {
    Demo.findAll( {where: {isLive: true}}).then(
        data =>{
            res.status(200).send(data)
        }
    ).catch(err=>{
        res.status(500).send({message: err.message || "some error occured when retrieving demos"})
    })
}