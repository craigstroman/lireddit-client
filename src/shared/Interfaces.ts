import { ReactNode, ChangeEvent } from 'react';
import { PostSnippetFragment } from '../generated/graphql';

export interface IPostFormValues {
  title: string;
  text: string;
}

export interface IRegisterFormValues {
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
  textArea?: boolean;
  value?: string;
  showLabels?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IChangePassword {
  new_password: string;
  password_confirmation: string;
}

export interface ILoginErrors {
  usernameOfEmail?: string;
  password?: string;
  new_password?: string;
  password_confirmation?: string;
}

export interface ITogglePassword {
  errors: ILoginErrors;
  onSendValue: (data: string) => void;
}

export interface IForgotPassword {
  email: string;
}

export interface ICreatePost {
  title: string;
  text: string;
}

export interface BaseLayoutProps {
  children?: ReactNode;
}

export interface IUser {
  id: number;
  username: string;
}

export interface UpdootSectionProps {
  post: PostSnippetFragment;
}
