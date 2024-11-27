const ADMIN_EMAIL = 'begzodbitski@gmail.com';
const ADMIN_USERNAME = 'admin';

export const isAdminUser = (user, username) => {
  return user?.email === ADMIN_EMAIL || username === ADMIN_USERNAME;
}; 