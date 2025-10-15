import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

export const UpdootSection: React.FC = () => {
  return (
    <div className="d-flex flex-row mb-2">
      <div className="p2">
        <FontAwesomeIcon icon={faAngleUp} className="icon" aria-label="Vote Up" />
      </div>
      <div className="p2">
        <FontAwesomeIcon icon={faAngleDown} className="icon" aria-label="Vote Down" />
      </div>
    </div>
  );
};
