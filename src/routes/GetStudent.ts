import { Request, Response } from "express";
import { Student } from "../models/Student";

export class GetStudent {
    
  public handleRequest(req: Request, res: Response): void {
    // Example: extract studentId from query or params
    const studentId = req.params.studentId || req.query.studentId;

    if (!studentId) {
      res.status(400).json({ error: "Missing studentId" });
      return;
    }

    // Convert to number
    const studentIdNumber = Number(studentId);
    if (isNaN(studentIdNumber)) {
      res.status(400).json({ error: "Invalid studentId" });
      return;
    }

    const student = Student.getStudentFromDB(studentIdNumber);
    if(!student){
        res.status(404).json({ error: "Student not found!" });
      return;
    }

    res.json({
      name: student.getName(),
      email: student.getEmail(),
      age: student.getAge(),
      isActive: student.getIsActive()
    });
  }
}
