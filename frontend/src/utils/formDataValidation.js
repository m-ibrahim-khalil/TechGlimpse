export default function validateFormData(formData) {
  const errors = {};
  if (formData?.fullname && !formData?.fullname?.trim()) {
    errors.fullname = "Full Name can't be empty or space";
  }
  if (formData?.username && !formData?.username?.trim()) {
    errors.username = "Username can't be empty or space";
  }
  if (formData?.email && !formData?.email?.includes('@')) {
    errors.email = "That doesn't look like an email address";
  }
  if (formData?.password?.length < 6) {
    errors.password = 'Password must be > 6 characters';
  }
  if (formData?.title && !formData?.title?.trim()) {
    errors.title = "Title can't be empty or space";
  }

  if (formData?.description && !formData?.description?.trim()) {
    errors.description = "Description can't be empty or space";
  }

  if (formData?.oldPassword?.length < 6) {
    errors.oldPassword = 'Old Password must be > 6 characters';
  }
  if (formData?.newPassword?.length < 6) {
    errors.newPassword = 'New Password must be > 6 characters';
  }
  return errors;
}
