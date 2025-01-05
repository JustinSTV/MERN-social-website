import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
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
    onSubmit: async (values) => {
      console.log(values);
      const success = await register(values);
      if(success){
        setTimeout(() => {
          navigate('/feed');
        }, 2000);
      }
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
          {
            formik.touched.firstName && formik.errors.firstName
            && <p>{formik.errors.firstName}</p>
          }
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
          {
            formik.touched.lastName && formik.errors.lastName
            && <p>{formik.errors.lastName}</p>
          }
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {
            formik.touched.confirmPassword && formik.errors.confirmPassword
            && <p>{formik.errors.confirmPassword}</p>
          }
        </div>
        <input type="submit" value="Register"/>
        {state.error && <div className="error">{state.error}</div>}
      </form>
    </section>
  );
}
 
export default RegisterPage;