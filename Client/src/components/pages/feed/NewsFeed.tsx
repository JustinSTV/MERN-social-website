import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import { usePostContext } from "../../../context/Post/usePostContext";
import Post from "../../UI/molecule/Post";
import { postSchema } from "../../../schemas/authSchema";

const NewsFeed = () => {
  const queryClient = useQueryClient();
  const { getPosts, createPosts, state } = usePostContext();

  const { isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

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

  if (isLoading) {
    return <div className="text-center py-4">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error loading posts</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <section className="max-w-2xl mx-auto space-y-4 py-4">
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
        {state.posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
};

export default NewsFeed;
