export interface IFormValues {
  username: string;
  password: string;
}

export interface InputFieldProps {
  placeholder: string;
  name: string;
  fieldErrors: {
    [key: string]: string;
  };
  touched: any;
}
