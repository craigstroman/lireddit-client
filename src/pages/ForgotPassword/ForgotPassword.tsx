import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/InputField/InputField';
import { IForgotPassword } from '../../shared/Interfaces';
import './ForgotPassword.scss';

export const ForgotPassword: React.FC = () => {
  const initialValues: IForgotPassword = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Enter a valid email.').required('Email is required.'),
  });
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {}}
        validationSchema={validationSchema}
      >
        {({ errors }) => {
          return (
            <Form>
              <div className="form-row">
                <InputField name="email" placeholder="Enter a email" fieldErrors={errors} />
              </div>
              <div className="form-row">
                <button type="submit" className="button">
                  Send Email
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
