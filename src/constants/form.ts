interface UserRegistration {
  id: string;
  type: 'email' | 'text' | 'password';
  inputType: 'select' | 'input';
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
}

export const USER_REGISTRATION_FORM: UserRegistration[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Nome completo',
    name: 'fullname',
    type: 'text',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'E-mail',
    name: 'email',
    type: 'email',
  },
  {
    id: '3',
    inputType: 'input',
    placeholder: 'Confirme o E-mail',
    name: 'confirmEmail',
    type: 'email',
  },
  {
    id: '4',
    inputType: 'input',
    placeholder: 'Senha',
    name: 'password',
    type: 'password',
  },
  {
    id: '5',
    inputType: 'input',
    placeholder: 'Confirme a senha',
    name: 'confirmPassword',
    type: 'password',
  },
];

export const USER_LOGIN_FORM: UserRegistration[] = [
  {
    id: '1',
    inputType: 'input',
    placeholder: 'Digite seu E-mail',
    name: 'email',
    type: 'email',
  },
  {
    id: '2',
    inputType: 'input',
    placeholder: 'Senha',
    name: 'password',
    type: 'password',
  },
];
