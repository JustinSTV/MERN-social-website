import { useFormik } from "formik";
import * as Yup from 'yup';

const RegisterPage = () => {

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
  
    }),
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First name:</label>
          <input 
            type="text" 
            id="firstName" name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last name:</label>
          <input 
            type="text" 
            id="lastName" name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
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
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
        </div>
        <input type="submit" value="Register"/>
      </form>
    </section>
  );
}
 
export default RegisterPage;