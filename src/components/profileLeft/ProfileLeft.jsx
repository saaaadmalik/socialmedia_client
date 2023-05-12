import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import InfoCard from '../infoCard/InfoCard'
import LogoSearch from '../logoSearch/LogoSearch'
import "./ProfileLeft.css"

const ProfileLeft = () => {
  return (
    <div className="profileLeft">
        <LogoSearch />
        <InfoCard />
        <FollowersCard location = "profilePage" />
    </div>
  )
}

export default ProfileLeft