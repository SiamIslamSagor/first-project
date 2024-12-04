import { z } from "zod";

// Zod schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name is required")
    .max(20, "First name cannot be more than 20 characters"),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, "Last Name is required"),
});

// Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's Name is required"),
  fatherOccupation: z.string().min(1, "Father's Occupation is required"),
  fatherContactNo: z.string().min(1, "Father's Contact Number is required"),
  motherName: z.string().min(1, "Mother's Name is required"),
  motherOccupation: z.string().min(1, "Mother's Occupation is required"),
  motherContactNo: z.string().min(1, "Mother's Contact Number is required"),
});

// Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local Guardian's Name is required"),
  occupation: z.string().min(1, "Local Guardian's Occupation is required"),
  contactNo: z.string().min(1, "Local Guardian's Contact Number is required"),
  address: z.string().min(1, "Local Guardian's Address is required"),
});

// Zod schema for Student
const studentValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z
    .string()
    .min(6, "Password can't be less then 6 chr")
    .max(20, "Password can't be more then 20 chr"),
  name: userNameValidationSchema,
  gender: z
    .enum(["male", "female", "other"], {
      invalid_type_error: "Gender must be one of: male, female, or other",
    })
    .refine((val) => ["male", "female", "other"].includes(val), {
      message: "{VALUE} is not valid",
    }),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  contactNo: z.string().min(1, "Contact Number is required"),
  emergencyContactNo: z.string().min(1, "Emergency Contact Number is required"),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
      invalid_type_error: "Invalid blood group",
    })
    .optional(),
  presentAddress: z.string().min(1, "Present Address is required"),
  permanentAddress: z.string().min(1, "Permanent Address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z
    .enum(["active", "blocked"], {
      invalid_type_error: "Status must be active or blocked",
    })
    .default("active"),
});

export default studentValidationSchema;
