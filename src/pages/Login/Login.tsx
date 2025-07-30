import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Enter a username"
                className={errors.username && touched.username ? 'input error' : 'input'}
                autocomplete="false"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="form-row">
              <Field
                type="password"
                name="password"
                placeholder="Enter a password"
                className={errors.username && touched.username ? 'input error' : 'input'}
                autocomplete="false"
              />
              <ErrorMessage name="password" component="div" className="error" />
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
