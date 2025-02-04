import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../../../../types/UserTypes";

type EditProfileModalProps = {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EditProfileData) => Promise<void>;
};

type EditProfileData = {
  firstName: string;
  lastName: string;
  bio: string;
};

const EditProfileModal = ({ user, isOpen, onSubmit, onClose }: EditProfileModalProps) => {
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      bio: Yup.string().max(500, "Bio cannot exceed 500 characters"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-secondary-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              {...formik.getFieldProps("firstName")}
              className="form-input"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="error-message">{formik.errors.firstName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              {...formik.getFieldProps("lastName")}
              className="form-input"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="error-message">{formik.errors.lastName}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              {...formik.getFieldProps("bio")}
              className="form-input min-h-[100px]"
            />
            {formik.touched.bio && formik.errors.bio && (
              <div className="error-message">{formik.errors.bio}</div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button onClick={onClose} className="px-4 py-2 rounded-full hover:bg-secondary-700">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 rounded-full hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
