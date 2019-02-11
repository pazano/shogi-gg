import React from 'react';

const InviteList = ({ invites, names, accept, reject }) => {
  if (invites && Object.keys(invites).length) {
    return (
      <div>
        <div className="friends__header">
          <h3>Invites ({invites.length})</h3>
        </div>
        {invites.map(invite =>
          <div className="friends__challenge-tile">
            <div className="friends__challenge-tile__user">
              {names[invite.initiated_by]}
            </div>
            <div>
              <button></button>
              <button></button>
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