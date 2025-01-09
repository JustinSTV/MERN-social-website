import { useFormik } from "formik";
import * as Yup from 'yup';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";
import { emailSchema, passwordSchema } from "../../../schemas/authSchema";

const LoginPage = () => {
  const { login, state } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/feed';

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: emailSchema,
      password: passwordSchema
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try{
        const success = await login(values.email, values.password);
        if(success){
          setTimeout(() => {
            navigate(from);
          }, 2000);
        }
      }finally{
        setSubmitting(false);
      }
    }
  });

  return (
    <section>
      <div className="auth-box">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" name="email"
              className={formik.touched.email && formik.errors.email ? 'error': ''}
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
              className={formik.touched.password && formik.errors.password ? 'error': ''}
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
          <button 
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          {state.error && <div className="error-message global">{state.error}</div>}
          {state.success && <div className="success">{state.success}</div>}
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </section>
  );
}
 
export default LoginPage;