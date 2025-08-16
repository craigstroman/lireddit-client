export interface IFormValues {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
}

export interface ILoginValues {
  usernameOrEmail: string;
  password: string;
}

export interface InputFieldProps {
  placeholder: string;
  name: string;
  fieldErrors: {
    [key: string]: string;
  };
  type?: string;
}
