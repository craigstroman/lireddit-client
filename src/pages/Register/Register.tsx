import React from 'react';
import { Formik, Form } from 'formik';
import { InputField } from '../../components/InputField/InputField';
import { IFormValues } from '../../shared/Interfaces';
import './Register.scss';

export const Register: React.FC = () => {
  const initialValues: IFormValues = {
    username: '',
    password: '',
  };

  const handleValidation = (values: IFormValues) => {
    const errors: IFormValues = {
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
    <div className="register-container">
      <h1>Register a new account</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
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
