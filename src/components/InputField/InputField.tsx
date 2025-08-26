import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputFieldProps } from '../../shared/Interfaces';
import './InputField.scss';

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, fieldErrors, type, textArea }) => {
  const inputFieldName: string = name;

  if (textArea) {
    return (
      <div className="input-container">
        <Field
          name={name}
          placeholder={placeholder}
          id={name}
          className={fieldErrors[inputFieldName] ? 'input error' : 'input'}
          as="textarea"
        />
        <div className="error">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }

  return (
    <div className="input-container">
      <Field
        type={type?.length ? type : 'text'}
        name={name}
        placeholder={placeholder}
        id={name}
        className={fieldErrors[inputFieldName] ? 'input error' : 'input'}
      />
      <div className="error">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
