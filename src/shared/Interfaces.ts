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

export interface IChangePassword {
  newPassword: string;
}

export interface ILoginErrors {
  usernameOfEmail?: string;
  password?: string;
  newPassword?: string;
}

export interface ITogglePassword {
  errors: ILoginErrors;
  onSendValue: (data: string) => void;
}
