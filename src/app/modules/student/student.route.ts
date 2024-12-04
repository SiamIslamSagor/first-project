import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.post("/create-student", StudentControllers.createStudent);

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.delete("/:studentId", StudentControllers.deleteStudent);

router.patch("/:studentId", StudentControllers.updateStudent);

export const StudentRoutes = router;
