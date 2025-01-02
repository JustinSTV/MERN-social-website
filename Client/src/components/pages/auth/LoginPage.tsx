import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";

const LoginPage = () => {
  const { login, state } = useUserContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
      password: Yup.string()
      .required('Password is required')
    }),
    onSubmit: async (values) => {
      const success = await login(values.email, values.password);
      if(success){
        navigate('/feed')
      }
    }
  })

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {
            formik.touched.email && formik.errors.email
            && <p>{formik.errors.email}</p>
          }
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {
            formik.touched.password && formik.errors.password
            && <p>{formik.errors.password}</p>
          }
        </div>
        <input type="submit" value="Login"/>
        {state.error && <div className="error">{state.error}</div>}
      </form>
    </section>
  );
}
 
export default LoginPage;