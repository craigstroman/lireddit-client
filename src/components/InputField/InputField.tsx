import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { InputFieldProps } from '../../shared/Interfaces';

export const InputField: React.FC<InputFieldProps> = ({ name, placeholder, fieldErrors, type, touched }) => {
  const inputFieldName: string = name;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
