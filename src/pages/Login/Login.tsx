import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { InputField } from '../../components/InputField/InputField';
import './Login.scss';

interface IformValues {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const [fieldType, setFieldType] = useState<string>('password');
  const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);

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

  const togglePasswordView = () => {
    if (fieldType === 'password') {
      setIcon(faEye);
      setFieldType('text');
    } else {
      setIcon(faEyeSlash);
      setFieldType('password');
    }
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
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-row">
              <InputField name="username" placeholder="Enter a username" fieldErrors={errors} />
            </div>

            <div className="form-row">
              <div className="password-input-container">
                <InputField
                  name="password"
                  placeholder="Enter a password"
                  fieldErrors={errors}
                  type={fieldType}
                />
                <div className={errors ? 'toggle-password error' : 'toggle-password'}>
                  <FontAwesomeIcon icon={icon} className="icon" onClick={togglePasswordView} />
                </div>
              </div>
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
