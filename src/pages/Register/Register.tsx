import React from 'react';
import { Formik, Form } from 'formik';
import { gql, useMutation } from 'urql';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { IFormValues } from '../../shared/Interfaces';
import './Register.scss';

// TODO: Figure out why Formik wont submit

export const Register: React.FC = () => {
  const REGISTER_MUTATION = gql`
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
  `;

  const [registerUserResult, executeRegisterResult] = useMutation(REGISTER_MUTATION);
  const initialValues: IFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required.'),
    last_name: Yup.string().required('Last name is required.'),
    email: Yup.string().email('Enter a valid email.').required('Email is required.'),
    username: Yup.string().required('Username is required.'),
    password: Yup.string()
      .required('Password is required.')
      .test('len', 'Password must be at least 5 characters long.', (val) => val.length >= 5),
  });

  return (
    <div className="register-container">
      <h1>Register a new account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submit form: ');
          // setSubmitting(false);
          executeRegisterResult(values);
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, errors }) => {
          console.log('isSubmitting: ', isSubmitting);
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
                <button type="submit" className="button">
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
