import React from 'react';
import { Formik, Form } from 'formik';
import { gql, useMutation } from 'urql';
import { InputField } from '../../components/InputField/InputField';
import { IFormValues } from '../../shared/Interfaces';
import './Register.scss';

export const Register: React.FC = () => {
  const REGISTER_MUTATION = useMutation(`
    mutation Register(
      $first_name: String!
      $last_name: String!
      $email: String!
      $username: String!
      $password: String!
    ) {
      register(
        options: {
          first_name: $first_name
          last_name: $last_name
          email: $email
          username: $username
          password: $password
        }
      ) {
        user {
          id
          createdAt
          updatedAt
          username
        }
        errors {
          field
          message
        }
      }
    }
  `);
  const [, register] = useMutation(REGISTER_MUTATION);
  const initialValues: IFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  const handleValidation = (values: IFormValues) => {
    const errors: IFormValues = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
    };
    if (!values.first_name) {
      errors.first_name = 'First name is required.';
    }

    if (!values.last_name) {
      errors.last_name = 'Last name is required.';
    }

    if (!values.email) {
      errors.email = 'Email is required.';
    }

    if (!values.username) {
      errors.username = 'Username is required.';
    }

    if (!values.password) {
      errors.password = 'Password is Required.';
    }
    return errors;
  };
  return (
    <div className="register-container">
      <h1>Register a new account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          // register()
        }}
        validate={(values) => handleValidation(values)}
      >
        {({ isSubmitting, errors }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="first_name" placeholder="Enter a first name" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField name="last_name" placeholder="Enter a last name" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField name="email" placeholder="Enter a first email address" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField name="username" placeholder="Enter a username" fieldErrors={errors} />
              </div>

              <div className="form-row">
                <InputField
                  name="password"
                  placeholder="Enter a password"
                  fieldErrors={errors}
                  type="password"
                />
              </div>
              <div className="form-row">
                <button type="submit" className="button" disabled={isSubmitting}>
                  Register
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
