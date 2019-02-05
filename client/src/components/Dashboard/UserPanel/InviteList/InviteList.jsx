import React from 'react';

const InviteTile = ({ invite }) => {
  return (
    <div>
      Invite
    </div>
  )
}

const InviteList = ({ invites }) => {
  if (invites && invites.length) {
    return (
      <div>
        {invites.map(invite => <InviteTile />)}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default InviteList;