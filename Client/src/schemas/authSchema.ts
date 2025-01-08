import * as Yup from 'yup';

export const firsNameSchema = Yup.string()
  .min(2, 'First name must be at least 2 characters')
  .max(30, 'First name cannot exceed 30 characters')
  .matches(/^[a-zA-Z]+$/, 'First name can only contain letters')
  .required('First name is required');

export const lastNameSchema = Yup.string()
  .min(2, 'Last name must be at least 2 characters')
  .max(30, 'Last name cannot exceed 30 characters')
  .matches(/^[a-zA-Z]+$/, 'Last name can only contain letters')
  .required('Last name is required');

export const emailSchema =  Yup.string()
  .email('Please enter a valid email address')
  .required('Email is required');

export const passwordSchema = Yup.string()
  .min(8, 'Password must be at least 8 characters')
  .max(50, 'Password cannot exceed 50 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    'Password must contain: uppercase, lowercase, number, and special character'
  )
  .required('Password is required');

export const confirmPasswordSchema = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Please confirm your password');