const express = require("express");
const users = require("../model/users");
const tasks = require("../model/task")
const Routes = express.Router();
const generateToken = require('../utils')
Routes.post("/singin", async (req, res) => {
    try {
        const {email,password}= req.body;
        const user = await users.findOne({email:email});
        console.log(user);
        if(user){
            if(password == user.password){
                res.send({
                    _id: user._id,
                    email:user.email,
                    token: generateToken(user)
                });
            console.log("sucess")
                return ;
            }
            
        }
        res.status(401).send({message:"invalid email or password!!"});
        
        
    } catch (error) {
        res.send({error})
    }
});

Routes.post("/register", async (req, res) => {
    try {
        console.log("this is for data"+req.body);
        const data = await users.insertMany({
            ...req.body
        });
        res.send({ data });
    
        
    } catch (error) {
        res.send({message:"this is an error"});
    }
});
Routes.post("/task", async (req, res) => {
    try {
        console.log("this is for data"+req.body.userEmail);
        const data = await tasks.insertMany({
            ...req.body
        });
        res.send({ data });
    
        
    } catch (error) {
        res.send({message:"this is an error"});
    }
});

Routes.get("/task/:email", async (req, res) => {
    try {
        console.log("this is for data"+req.params.email);
        const data = await tasks.find({ userEmail:req.params.email
        });
        res.send({ data });
    
        
    } catch (error) {
        res.send({message:"this is an error"});
    }
});
Routes.delete("/task/:id", async (req, res) => {
    try {
        console.log("this is for data"+req.params.id);
        const data = await tasks.findById(req.params.id);
        data.remove();
        res.send({ data });
    
        
    } catch (error) {
        res.send({message:"this is an error"});
    }
});




module.exports = Routes;
