import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";
import { confirmPasswordSchema, emailSchema, firsNameSchema, lastNameSchema, passwordSchema } from "../../../schemas/authSchema";

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
      confirmPassword: confirmPasswordSchema
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await register(values);
        if (success) {
          setTimeout(() => {
            navigate('/feed');
          }, 2000);
        }
      } finally {
        setSubmitting(false);
      }
    }
  })

  return (
    <section>
      <div className="auth-box">
        <h1>Register</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First name:</label>
            <input 
              type="text" 
              id="firstName" name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              disabled={formik.isSubmitting}
            />
            {
              formik.touched.firstName && formik.errors.firstName
              && <div className="error-message">{formik.errors.firstName}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name:</label>
            <input 
              type="text" 
              id="lastName" name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              disabled={formik.isSubmitting}
            />
            {
              formik.touched.lastName && formik.errors.lastName
              && <div className="error-message">{formik.errors.lastName}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              disabled={formik.isSubmitting}
            />
            {
              formik.touched.email && formik.errors.email
              && <div className="error-message">{formik.errors.email}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={formik.isSubmitting}
            />
            {
              formik.touched.password && formik.errors.password
              && <div className="error-message">{formik.errors.password}</div>
            }
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              disabled={formik.isSubmitting}
            />
            {
              formik.touched.confirmPassword && formik.errors.confirmPassword
              && <div className="error-message">{formik.errors.confirmPassword}</div>
            }
          </div>
          <button 
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </button>
          {state.error && <div className="error-message global">{state.error}</div>}
          {state.success && <div className="success">{state.success}</div>}
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </section>
  );
}
 
export default RegisterPage;