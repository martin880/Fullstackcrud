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
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search_query || "";
        const offset = limit * page;
        const totalRows = await User.count({
            where:{
                [Op.or]:[
                    {name: {[Op.like]: "%" + search + "%"}},
                    {email: {[Op.like]: "%" + search + "%"}},
                ],
            },
        });
        const totalPages = Math.ceil(totalRows / limit);
        const result = await User.findAll({
            where:{
                [Op.or]:[
                    {name: {[Op.like]: "%" + search + "%"}},
                    {email: {[Op.like]: "%" + search + "%"}},
                ],
            },
            offset: offset,
            limit: limit,
            order:[['id', 'DESC']]
        });
        res.json({
            result: result,
            page: page,
            limit: limit,
            totalRows: totalRows,
            totalPages: totalPages,
        })

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