import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { type UserFormErrors, validateUserForm } from "../src/validations/user-validations";

export default function AddUserScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");

  const [errors, setErrors] = useState<UserFormErrors>({});

  function handleSubmit() {
    const validationErrors = validateUserForm({ name, email, phone, birthDate, role });
    setErrors(validationErrors);
  }

  function handleChange(field: keyof UserFormErrors, value: string) {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "phone") setPhone(value);
    if (field === "birthDate") setBirthDate(value);

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  return (
    <View>
      <Text>Adicionar Usuário</Text>

      <TextInput placeholder="Nome completo" value={name} onChangeText={(v) => handleChange("name", v)} />
      {!!errors.name && <Text>{errors.name}</Text>}

      <TextInput placeholder="E-mail" value={email} onChangeText={(v) => handleChange("email", v)} />
      {!!errors.email && <Text>{errors.email}</Text>}

      <TextInput
        placeholder="Telefone"
        keyboardType="numeric"
        value={phone}
        onChangeText={(v) => handleChange("phone", v)}
      />
      {!!errors.phone && <Text>{errors.phone}</Text>}

      <TextInput
        placeholder="Data de nascimento (YYYY-MM-DD)"
        value={birthDate}
        onChangeText={(v) => handleChange("birthDate", v)}
      />
      {!!errors.birthDate && <Text>{errors.birthDate}</Text>}

      <View>
        <TouchableOpacity onPress={() => setRole("USER")}>
          <Text>{role === "USER" ? "[X] USER" : "[ ] USER"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole("ADMIN")}>
          <Text>{role === "ADMIN" ? "[X] ADMIN" : "[ ] ADMIN"}</Text>
        </TouchableOpacity>
      </View>
      {!!errors.role && <Text>{errors.role}</Text>}

      <TouchableOpacity onPress={handleSubmit}>
        <Text>Adicionar Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}
