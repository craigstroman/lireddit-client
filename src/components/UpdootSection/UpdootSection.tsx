import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { PostSnippetFragment, useVoteMutation } from '../../generated/graphql';
import './UpdootSection.scss';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

// TODO: Fix error that occurs when I click on upvote

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  const handleUpVote = async () => {
    await vote({
      postId: post.id,
      value: 1,
    });
  };

  const handleDownVote = async () => {
    await vote({
      postId: post.id,
      value: -1,
    });
  };

  return (
    <div className="updoot-container">
      <div className="arrow-container">
        <FontAwesomeIcon
          icon={faAngleUp}
          className="icon"
          aria-label="Vote Up"
          onClick={async () => handleUpVote()}
        />
      </div>
      <div className="point-container">{post.points}</div>
      <div className="arrow-container">
        <FontAwesomeIcon
          icon={faAngleDown}
          className="icon"
          aria-label="Vote Down"
          onClick={async () => handleDownVote()}
        />
      </div>
    </div>
  );
};
