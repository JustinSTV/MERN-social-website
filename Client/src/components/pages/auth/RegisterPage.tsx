import AuthLayout from "../../template/AuthLayout";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";
import {
  confirmPasswordSchema,
  emailSchema,
  firsNameSchema,
  lastNameSchema,
  passwordSchema,
} from "../../../schemas/authSchema";

const RegisterPage = () => {
  const { register, state } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: firsNameSchema,
      lastName: lastNameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await register(values);
        if (success) {
          setTimeout(() => {
            navigate("/feed");
          }, 2000);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout>
      <h1 className="text-center text-4xl font-bold mb-8">Join Today!</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`form-input ${
              formik.touched.firstName && formik.errors.firstName
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            disabled={formik.isSubmitting}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error-message">{formik.errors.firstName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`form-input ${
              formik.touched.lastName && formik.errors.lastName
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            disabled={formik.isSubmitting}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error-message">{formik.errors.lastName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${
              formik.touched.email && formik.errors.email
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={formik.isSubmitting}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-input ${
              formik.touched.password && formik.errors.password
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            disabled={formik.isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-input ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "form-input-error"
                : ""
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            disabled={formik.isSubmitting}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error-message">{formik.errors.confirmPassword}</div>
          )}
        </div>

        {state.error && (
          <div className="error-message global">{state.error}</div>
        )}
        {state.success && <div className="success">{state.success}</div>}

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="bg-blue-500 text-white font-bold py-3 px-7 w-4/5 mx-auto block rounded-3xl"
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="flex items-center w-4/5 mx-auto my-4">
        <div className="flex-grow border-t border-white"></div>
        <span className="px-4 text-white">or</span>
        <div className="flex-grow border-t border-white"></div>
      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-white text-black font-bold py-3 px-7 w-4/5 mx-auto block rounded-3xl"
      >
        Already have an account
      </button>
    </AuthLayout>
  );
};

export default RegisterPage;
