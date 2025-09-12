export interface UserForm {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  role: string;
}

export interface UserFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  birthDate?: string;
  role?: string;
}

export function validateName(name: string): string | null {
  if (!name.trim() || !name.includes(" ")) {
    return "O nome deve conter pelo menos 2 palavras";
  }
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "E-mail é obrigatório";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Formato de e-mail inválido";
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!/^\d{10,11}$/.test(phone)) {
    return "Telefone deve ter 10 ou 11 dígitos";
  }
  return null;
}

export function validateBirthDate(birthDate: string): string | null {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime()) || birth > new Date()) {
    return "Data de nascimento inválida";
  }
  return null;
}

export function validateRole(role: string): string | null {
  if (!["ADMIN", "USER"].includes(role)) {
    return "Selecione um papel válido";
  }
  return null;
}

export function validateUserForm(data: UserForm): UserFormErrors {
  return {
    name: validateName(data.name) || undefined,
    email: validateEmail(data.email) || undefined,
    phone: validatePhone(data.phone) || undefined,
    birthDate: validateBirthDate(data.birthDate) || undefined,
    role: validateRole(data.role) || undefined,
  };
}
