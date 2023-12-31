import express from "express";
import { getUsers, getUsersById, createUser, updateUser, deleteUser, getUsersByName } from "../controllers/UserControllers.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersById);
router.post('/users/v1', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/v3', getUsersByName);

export default router;