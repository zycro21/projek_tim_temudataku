import express from "express";
import { createProjectHandler, getAllProjectsHandler, updateProjectHandler, deleteProjectHandler } from "../controllers/projectController";

const router = express.Router();

router.post("/", createProjectHandler); 
router.get("/", getAllProjectsHandler);  
router.put("/:id", updateProjectHandler); 
router.delete("/:id", deleteProjectHandler); 

export default router;
