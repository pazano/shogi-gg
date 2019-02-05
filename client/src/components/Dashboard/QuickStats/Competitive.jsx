import React from 'react'
import MatchHistorySnapshot from '../../Account/MatchHistorySnapshot.jsx'

const Competitive = () => {
  return (
    <div className="dashboard__competitive">
      <div className="dashboard__section-header">
        <h3>Match History</h3>
      </div>
      <MatchHistorySnapshot />
    </div>
  )
}

export default Competitive;