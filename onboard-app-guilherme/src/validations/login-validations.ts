import { emailRegex, hasDigitRegex, hasLetterRegex } from "../utils/regex";

export interface LoginErrors {
  email?: string;
  password?: string;
};

export function validateEmail(email: string): string | null {
  if (!email) {
    return "E-mail é obrigatório";
  }
  if (!emailRegex.test(email)) {
    return "Formato de e-mail inválido";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "A senha é obrigatória";
  }
  if (password.length < 7) {
    return "A senha deve ter pelo menos 7 caracteres";
  }
  if (!hasLetterRegex.test(password) || !hasDigitRegex.test(password)) {
    return "A senha deve conter ao menos uma letra e um número";
  }
  return null;
}

export function validateLoginForm(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  const emailError = validateEmail(email);
  const passError = validatePassword(password);
  if (emailError) {
    errors.email = emailError;
  }
  if (passError) {
    errors.password = passError;
  }
  return errors;
}
