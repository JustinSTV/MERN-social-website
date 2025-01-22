import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/User/useUserContext";
import { emailSchema, passwordSchema } from "../../../schemas/authSchema";

const LoginPage = () => {
  const { login, state } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/feed";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: emailSchema,
      password: passwordSchema,
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await login(values.email, values.password);
        if (success) {
          setTimeout(() => {
            navigate(from);
          }, 2000);
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section className="min-h-screen flex items-center justify-center gap-20">
      <h1>YOUnivers</h1>
      <div className="w-full max-w-md p-6">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          {state.error && (
            <div className="error-message text-center">{state.error}</div>
          )}
          {state.success && <div className="success">{state.success}</div>}
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="bg-blue-500 text-white font-bold py-3 px-7 w-4/5 mx-auto block rounded-lg"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => navigate("/register")}
          className="bg-white text-black font-bold py-3 px-7 w-4/5 mx-auto block rounded-lg"
        >
          Create Account
        </button>
      </div>
    </section>
  );
};

export default LoginPage;
