import React from 'react';
import './ChallengeList.css';

const ChallengeOption = ({ challenge, accept, reject }) => {
    const challengeValue = JSON.stringify(challenge);
    return (
      <div className="friends__choice-tile__actions">
        { challenge.type === 'FROM' ? <button value={challengeValue} onClick={e => accept(e)}>&#10004;</button> : <div></div> }
        <button value={challengeValue} onClick={e => reject(e)}>X</button>
      </div>
    );
}

const ChallengeTile = ({ challenge, accept, reject, names }) => {
  return (
    <div className="friends__choice-tile">
      <div className="friends__choice-tile__type">
        {challenge.type}
      </div>
      <div className="friends__choice-tile__user">
        {`${challenge.type === 'TO' ? names[challenge.toUser] : names[challenge.fromUser]}`}
      </div>
      <ChallengeOption
        challenge={challenge}
        accept={accept}
        reject={reject}
      />
    </div>
  )
}

const ChallengeList = ({ names, challenges, accept, reject }) => {
  if (challenges && Object.keys(challenges).length) {
    return (
      <div>
        <div className="friends__header">
          <h3>Open Challenges</h3>
        </div>
        { Object.entries(challenges).map(([id, challenge]) =>
            <ChallengeTile
              key={id} challenge={challenge}
              accept={accept} reject={reject}
              names={names}
            />) }
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default ChallengeList;