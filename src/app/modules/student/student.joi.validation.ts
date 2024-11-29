/* -- CREATING A SCHEMA VALIDATION USING JOI -- */

import Joi from "joi";

// Nested schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/, "capitalize format")
    .messages({
      "string.empty": "First Name is required",
      "string.max": "First name cannot be more than 20 characters",
      "string.pattern.name": "{#value} is not in capitalize format",
    }),
  middleName: Joi.string().trim().allow(""),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "Last Name is required",
      "string.pattern.base": "{#value} is not valid",
    }),
});

// Nested schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    "string.empty": "Father's Name is required",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.empty": "Father's Occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.empty": "Father's Contact Number is required",
  }),
  motherName: Joi.string().required().messages({
    "string.empty": "Mother's Name is required",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.empty": "Mother's Occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.empty": "Mother's Contact Number is required",
  }),
});

// Nested schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Local Guardian's Name is required",
  }),
  occupation: Joi.string().required().messages({
    "string.empty": "Local Guardian's Occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Local Guardian's Contact Number is required",
  }),
  address: Joi.string().required().messages({
    "string.empty": "Local Guardian's Address is required",
  }),
});

// Main Student schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "{#value} is not valid",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "{#value} is not a valid email",
  }),
  contactNo: Joi.string().required().messages({
    "string.empty": "Contact Number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.empty": "Emergency Contact Number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "any.only": "Invalid blood group",
    }),
  presentAddress: Joi.string().required().messages({
    "string.empty": "Present Address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.empty": "Permanent Address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian details are required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local Guardian details are required",
  }),
  profileImg: Joi.string().uri().messages({
    "string.uri": "Profile Image must be a valid URL",
  }),
  isActive: Joi.string().valid("active", "blocked").default("active").messages({
    "any.only": "Status must be active or blocked",
  }),
});

export default studentValidationSchema;
