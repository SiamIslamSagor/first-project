import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // built in STATIC METHOD BY MONGOOSE
  if (await Student.isUserExist(studentData.id)) {
    throw new Error("User already exists!");
  }

  const result = await Student.create(studentData);
  /* const student = new Student(studentData); // create an instance
  if (await student.isUserExist(studentData.id)) {
    throw new Error("User already exists!");
  } */

  // built in INSTANCE METHOD BY MONGOOSE
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
