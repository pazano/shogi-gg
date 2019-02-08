import React from 'react';

const InviteTile = ({ invite }) => {
  return (
    <div>
      {invite.username}
    </div>
  )
}

const InviteList = ({ invites }) => {
  if (invites && Object.keys(invites).length) {
    return (
      <div>
        {invites.map(invite => <InviteTile invite={invite} key={`inv-${invite.id}-${invite.username}`} />)}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default InviteList;