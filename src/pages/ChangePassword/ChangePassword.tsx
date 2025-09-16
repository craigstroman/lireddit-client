import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toErrorMap } from '../../shared/utils/toErrorMap';
import { InputField } from '../../components/InputField/InputField';
import { IChangePassword } from '../../shared/Interfaces';
import { TogglePassword } from '../../components/TogglePassword/TogglePassword';
import { useChangePasswordMutation } from '../../generated/graphql';
import './ChangePassword.scss';

export const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [fieldTypeOne, setFieldTypeOne] = useState<string>('password');
  const [fieldTypeTwo, setFieldTypeTwo] = useState<string>('password');
  const [tokenError, setTokenError] = useState<string>('');
  const { token } = useParams();

  const initialValues: IChangePassword = {
    new_password: '',
    password_confirmation: '',
  };

  const validationSchema = Yup.object({
    new_password: Yup.string()
      .required('Password is required.')
      .min(6, 'Password must be at least 6 characters long.')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, 'Password must special characters.'),
    password_confirmation: Yup.string()
      .required('Password confirmation is required.')
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, 'Password must special characters.')
      .oneOf([Yup.ref('new_password')], 'Passwords must match.'),
  });

  const handleToggleFieldOne = (data: string) => {
    setFieldTypeOne(data);
  };

  const handleToggleFieldTwo = (data: string) => {
    setFieldTypeTwo(data);
  };

  const [changePassword] = useChangePasswordMutation();

  return (
    <div className="change-password-container">
      {tokenError && <div className="form-error">{tokenError}</div>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          let response = undefined;
          if (token) {
            response = await changePassword({
              variables: {
                new_password: values.new_password,
                token,
              },
            });
          }

          if (response && response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response && response.data?.changePassword.user) {
            navigate('/dashboard');
          }
        }}
        validationSchema={validationSchema}
      >
        {({ errors, submitForm }) => {
          return (
            <Form>
              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="new_password"
                    placeholder="Enter a password"
                    fieldErrors={errors}
                    type={fieldTypeOne}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleFieldOne} />
                </div>
              </div>
              <div className="form-row">
                <div className="password-input-container">
                  <InputField
                    name="password_confirmation"
                    placeholder="Enter password confirmation"
                    fieldErrors={errors}
                    type={fieldTypeTwo}
                  />
                  <TogglePassword errors={errors} onSendValue={handleToggleFieldTwo} />
                </div>
              </div>
              <div className="form-row">
                <button type="submit" className="save-password-button" onClick={submitForm}>
                  Save Password
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
