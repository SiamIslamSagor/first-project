import { model, Schema } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First name cannot be more the 20 characters "],
    /* validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format.',
    }, */
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    /* validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    }, */
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact Number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact Number is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local Guardian's Name is required"],
  },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact Number is required"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: [20, "Password can not be more then 20 characters"],
    minlength: [6, "Password can not be less then 6 characters"],
    select: false,
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "{VALUE} is not valid",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    /* validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is a not valid email',
    }, */
  },
  contactNo: {
    type: String,
    required: [true, "Contact Number is required"],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency Contact Number is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "Invalid blood group",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local Guardian details are required"],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ["active", "blocked"],
      message: "Status must be active or blocked",
    },
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

/* ------------ DOCUMENT MIDDLEWARE ----------- */

// PRE SAVE MIDDLEWARE/HOOK : will work on create() and save() method
studentSchema.pre("save", async function (next) {
  // encrypt the password and replace the encrypted password to original one
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );

  next();
});

// POST SAVE MIDDLEWARE/HOOK
studentSchema.post("save", function (doc, next) {
  // replaced password to empty string temporary to hide saved password while data is already saved, and it's never affect to db data
  doc.password = "";
  next();
});

/* ------------- QUERY MIDDLEWARE ------------- */

studentSchema.pre("find", function (next) {
  // ignore those doc which is deleted by chining with original query (like filter!)
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre("findOne", function (next) {
  // ignore those doc which is deleted by chining with original query (like filter!)
  this.find({ isDeleted: { $ne: true } });

  next();
});

studentSchema.pre("aggregate", function (next) {
  // [ { '$match': { $ne: true}}, { '$match': { id: '1227' } } ]

  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

/* --------------- CUSTOM METHOD -------------- */

// CREATING A CUSTOM STATIC METHOD
studentSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

/* // CREATING A CUSTOM INSTANCE METHOD
studentSchema.methods.isUserExist = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
}; */

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
