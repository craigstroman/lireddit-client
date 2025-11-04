import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useVoteMutation } from '../../generated/graphql';
import { UpdootSectionProps } from '../../shared/Interfaces';
import './UpdootSection.scss';

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  const handleUpVote = async () => {
    if (post.voteStatus === 1) {
      return;
    } else {
      await vote({
        postId: post.id,
        value: 1,
      });
    }
  };

  const handleDownVote = async () => {
    if (post.voteStatus === -1) {
      return;
    } else {
      await vote({
        postId: post.id,
        value: -1,
      });
    }
  };

  return (
    <div className="updoot-container">
      <div className="arrow-container">
        <button
          type="button"
          onClick={async () => handleUpVote()}
          className={post.voteStatus === 1 ? 'icon-button green' : 'icon-button'}
        >
          <FontAwesomeIcon icon={faAngleUp} className="icon" aria-label="Vote Up" />
        </button>
      </div>
      <div className="point-container">{post.points}</div>
      <div className="arrow-container">
        <button
          type="button"
          onClick={async () => handleDownVote()}
          className={post.voteStatus === -1 ? 'icon-button red' : 'icon-button'}
        >
          <FontAwesomeIcon icon={faAngleDown} className="icon" aria-label="Vote Down" />
        </button>
      </div>
    </div>
  );
};
