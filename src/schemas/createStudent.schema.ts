import { z } from "zod";

// Define the UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .trim()
    .max(20, "First Name cannot be more than 20 characters"),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(1, "Last Name is required")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last Name is not valid",
    }),
});

// Define the Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string({ required_error: "Father's Name is required" })
    .min(1, "Father's Name is required"),
  fatherOccupation: z
    .string({ required_error: "Father's Occupation is required" })
    .min(1, "Father's Occupation is required"),
  fatherContactNo: z
    .string({ required_error: "Father's Contact Number is required" })
    .min(1, "Father's Contact Number is required"),
  motherName: z
    .string({ required_error: "Mother's Name is required" })
    .min(1, "Mother's Name is required"),
  motherOccupation: z
    .string({ required_error: "Mother's Occupation is required" })
    .min(1, "Mother's Occupation is required"),
  motherContactNo: z
    .string({ required_error: "Mother's Contact Number is required" })
    .min(1, "Mother's Contact Number is required"),
});

// Define the LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z
    .string({ required_error: "Local Guardian's Name is required" })
    .min(1, "Local Guardian's Name is required"),
  occupation: z
    .string({ required_error: "Local Guardian's Occupation is required" })
    .min(1, "Local Guardian's Occupation is required"),
  contactNo: z
    .string({ required_error: "Local Guardian's Contact Number is required" })
    .min(1, "Local Guardian's Contact Number is required"),
  address: z
    .string({ required_error: "Local Guardian's Address is required" })
    .min(1, "Local Guardian's Address is required"),
});

// Define the Student schema
export const studentValidationSchema = z.object({
  password: z.string().optional(), // Make optional, but if required add .min(1, "Password is required")
  student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
    dateOfBirth: z.string().optional(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Email is not valid"),
    contactNo: z
      .string({ required_error: "Contact Number is required" })
      .min(1, "Contact Number is required"),
    emergencyContactNo: z
      .string({ required_error: "Emergency Contact Number is required" })
      .min(1, "Emergency Contact Number is required"),
    bloodGroup: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        required_error: "Blood Group is required",
      })
      .optional(),
    presentAddress: z
      .string({ required_error: "Present Address is required" })
      .min(1, "Present Address is required"),
    permanentAddress: z
      .string({ required_error: "Permanent Address is required" })
      .min(1, "Permanent Address is required"),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    admissionSemester: z.string({
      required_error: "Admission Semester is required",
    }),
    // profileImg: z.string().optional(), // Uncomment if needed
  }),
});
