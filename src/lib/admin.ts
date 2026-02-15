export const ADMIN_EMAILS = ["nilesh2331sarkar@gmail.com"];

export const isAdminEmail = (email?: string | null) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
