import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputFieldProps } from '../../shared/Interfaces';
import './InputField.scss';

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, fieldErrors, type }) => {
  const inputFieldName: string = name;
  return (
    <div className="input-container">
      <Field
        type={type?.length ? type : 'text'}
        name={name}
        placeholder={placeholder}
        id={name}
        className={fieldErrors[inputFieldName] ? 'input error' : 'input'}
        autocomplete="false"
      />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
