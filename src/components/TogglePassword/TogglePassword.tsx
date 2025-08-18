import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { IErrors } from '../../shared/Interfaces';
import './TogglePassword.scss';

export const TogglePassword: React.FC<IErrors> = ({ errors }) => {
  console.log('errors: ', errors);
  const [fieldType, setFieldType] = useState<string>('password');
  const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);
  const [iconLabel, setIconLabel] = useState<string>('Hide password');

  const togglePasswordView = () => {
    if (fieldType === 'password') {
      setIcon(faEye);
      setFieldType('text');
      setIconLabel('Show password');
    } else {
      setIcon(faEyeSlash);
      setFieldType('password');
      setIconLabel('Hide password');
    }
  };
  return (
    <div className={errors.password ? 'toggle-password error' : 'toggle-password'}>
      <FontAwesomeIcon icon={icon} className="icon" onClick={togglePasswordView} aria-label={iconLabel} />
    </div>
  );
};
