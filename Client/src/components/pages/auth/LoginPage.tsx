import { useFormik } from "formik";
import * as Yup from 'yup';
import { useAuth } from "../../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({

    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        });

        const data = await response.json();
        
        if (response.ok) {
          login(data.token, data.user);
          navigate('/feed');
        } else {
          console.error('Login failed:', data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
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
        <input type="submit" value="Login"/>
      </form>
    </section>
  );
}
 
export default LoginPage;