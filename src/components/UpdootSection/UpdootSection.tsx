import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import './UpdootSection.scss';

export const UpdootSection: React.FC = () => {
  return (
    <div className="updoot-container">
      <div className="arrow-container">
        <FontAwesomeIcon icon={faAngleUp} className="icon" aria-label="Vote Up" />
      </div>
      <div className="arrow-container">
        <FontAwesomeIcon icon={faAngleDown} className="icon" aria-label="Vote Down" />
      </div>
    </div>
  );
};
