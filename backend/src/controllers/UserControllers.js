import { Op } from "sequelize";
import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersByName = async(req, res) => {
    try {
        const search = req.query.search_query || "";
        const results = await User.findAll({
            where:{
                [Op.or]: [{name:{
                    [Op.like]: '%'+search+'%'
                }}, {email:{
                    [Op.like]: '%'+search+'%'
                }}]
            },
        });
        return res.send(results);        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        });
    }
}

export const createUser = async(req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({msg:"User has been created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    try {
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User has been updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"User has been deleted"});
    } catch (error) {
        console.log(error.message);
    }
}