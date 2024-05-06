export interface LoginTypes {
  email: string;
  password: string;
}

export interface ErrorTypes {
  non_field_errors: string;
}

export interface ChangePasswordTypes {
  old_password: string,
  new_password: string,
  confirm_password: string,
}

export interface ChangePasswordErrorTypes {
  old_password: string,
  new_password: string,
  confirm_password: string,
  non_field_errors: string
}

export interface ForgotPasswordTypes {
  email: string;
}

export interface ForgotPasswordErrorTypes {
  email: string;
}

export interface ResetPasswordTypes {
  password: string,
  confirm_password: string
}

export interface ResetPasswordErrorTypes {
  password: string;
  confirm_password: string;
}
