import { Request, Response } from "express";
import { Student } from "../models/Student";

export class PostStudent {
  public handleRequest(req: Request, res: Response): void {
    const { name, email, age, isActive } = req.body;

    // Basic validation
    if (
      !name ||
      !email ||
      typeof age !== "number" ||
      typeof isActive !== "boolean"
    ) {
      res.status(400).json({ error: "Missing or invalid student data" });
      return;
    }

    // Create new student (assuming Student.createStudentInDB returns the created student or null)
    const student = Student.createStudentInDB({ name, email, age, isActive });

    if (!student) {
      res.status(500).json({ error: "Failed to create student" });
      return;
    }

    res.status(201).json({
      message: "Student created successfully",
      student: {
        name: student.getName(),
        email: student.getEmail(),
        age: student.getAge(),
        isActive: student.getIsActive(),
      },
    });
  }
}
