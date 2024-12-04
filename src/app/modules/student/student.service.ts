import { TStudent, TUserName } from "./student.interface";
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
  // const result = await Student.findOne({ id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const updateStudentFromDB = async (id: string, updatedDoc: TUserName) => {
  const result = await Student.updateOne(
    { id },
    {
      $set: updatedDoc,
    },
  );
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      $set: {
        isDeleted: true,
      },
    },
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
};
