import React from 'react';

const ChallengeTile = ({ challenge }) => {
  return (
    <div>
      Challenge
    </div>
  )
}

const ChallengeList = ({ challenges }) => {
  if (challenges && challenges.length) {
    return (
      <div>
        { challenges.map(challenge => <ChallengeTile challenge={challenge} />) }
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default ChallengeList;