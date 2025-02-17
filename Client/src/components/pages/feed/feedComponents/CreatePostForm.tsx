import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import { postSchema } from "../../../../schemas/authSchema";
import { usePostContext } from "../../../../context/Post/usePostContext";

const CreatePostForm = () => {
  const queryClient = useQueryClient();
  const { createPosts, state } = usePostContext();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: postSchema,
    }),
    onSubmit: async (values, { resetForm }) => {
      const success = await createPosts(values.content);
      if (success) {
        resetForm();
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="bg-secondary-800 rounded-lg p-6 mb-4">
      <div className="form-group">
        <textarea
          name="content"
          id="content"
          placeholder="What's on your mind?"
          className={`w-full p-2 bg-transparent border-0 border-b-2 focus:ring-0 focus:outline-none resize-none ${
            formik.touched.content && formik.errors.content
              ? "form-input-error"
              : "border-secondary-700 focus:border-primary-600"
          }`}
          onChange={formik.handleChange}
          value={formik.values.content}
          disabled={formik.isSubmitting}
        />
        {formik.submitCount > 0 && formik.errors.content && (
          <div className="error-message">{formik.errors.content}</div>
        )}
      </div>
      {state.error && <div className="text-red-500 text-sm mt-2">{state.error}</div>}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-secondary-400">{formik.values.content.length}/500</span>
        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
          className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700 transition disabled:opacity-50"
        >
          {formik.isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
