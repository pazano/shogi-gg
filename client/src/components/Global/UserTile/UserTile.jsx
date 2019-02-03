import React from 'react';
import { Link } from 'react-router-dom';
import './UserTile.css';


const { AVATAR_URL } = process.env;

const UserTile = ({ socket, logoutAction }) => {
  let aviSrc = localStorage.avi ? `${AVATAR_URL}${localStorage.avi}` : "http://res.cloudinary.com/shogigrandmasters/image/upload/v1521760976/mi69trcbxaq3ubkq4yh4.png";
  let aviStyle = {
    backgroundImage: `url(${aviSrc})`
  }
  return(
    <div className="user__tile">
      <div className="user__tile-avatar" style={aviStyle} />
      <div className="user__tile-data">
        <div className="user__tile-username">
          <Link to="/acct" onClick={() => socket.close()}>{localStorage.username}</Link>
        </div>
        <div className="user__tile-actions">
          <Link to="/login" onClick={() => logoutAction()}>Logout</Link>
        </div>
      </div>
    </div>
  )
}

export default UserTile;