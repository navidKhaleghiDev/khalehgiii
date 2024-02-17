const ROLE_SUPER_USER = 'ادمین ارشد';
const ROLE_ADMIN = 'ادمین';
const ROLE_ANALYSER = 'تحلیل گر';

export function getRoleUser(is_superuser?: boolean, is_admin?: boolean) {
  if (is_admin && is_superuser) {
    return ROLE_SUPER_USER;
  }
  if (is_admin) {
    return ROLE_ADMIN;
  }
  return ROLE_ANALYSER;
}
