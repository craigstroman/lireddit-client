import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PostSnippetFragment, useVoteMutation } from '../../generated/graphql';
import './UpdootSection.scss';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>(
    'not-loading',
  );
  const [, vote] = useVoteMutation();

  return (
    <div className="updoot-container">
      <div className="arrow-container">
        <FontAwesomeIcon icon={faAngleUp} className="icon" aria-label="Vote Up" />
      </div>
      <div className="point-container">{post.points}</div>
      <div className="arrow-container">
        <FontAwesomeIcon icon={faAngleDown} className="icon" aria-label="Vote Down" />
      </div>
    </div>
  );
};
