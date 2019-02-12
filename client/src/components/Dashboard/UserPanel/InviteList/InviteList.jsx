import React from 'react';

const InviteList = ({ invites, names, accept, reject }) => {
  if (invites && Object.keys(invites).length) {
    return (
      <div>
        <div className="friends__header">
          <h3>Invites ({invites.length})</h3>
        </div>
        {invites.map(invite =>
          <div className="friends__choice-tile" key={`invite-${invite.id}`}>
            <div className="friends__choice-tile__user">
              {names[invite.initiated_by]}
            </div>
            <div className="friends__choice-tile__actions">
              <button value={invite.friend_key} onClick={e => accept(e)}>&#10004;</button>
              <button value={invite.friend_key} onClick={e => reject(e)}>X</button>
            </div>
          </div>
          )}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default InviteList;