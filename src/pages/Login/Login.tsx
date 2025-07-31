import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputField } from '../../components/InputField/InputField';
import './Login.scss';

interface IformValues {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const initialValues: IformValues = {
    username: '',
    password: '',
  };

  const handleValidation = (values: IformValues) => {
    const errors: IformValues = {
      username: '',
      password: '',
    };
    if (!values.username) {
      errors.username = 'Username is required';
    }

    if (!values.password) {
      errors.password = 'Password is Required';
    }
    return errors;
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
        validate={(values) => handleValidation(values)}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <div className="form-row">
              <InputField name="username" placeholder="Enter a username" touched fieldErrors={errors} />
            </div>

            <div className="form-row">
              <InputField
                name="password"
                placeholder="Enter a password"
                touched
                fieldErrors={errors}
                type="password"
              />
            </div>
            <div className="form-row">
              <button type="submit" className="button" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
