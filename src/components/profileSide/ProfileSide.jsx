import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import "./ProfileSide.css"

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch />
        <ProfileCard location="homePage" />
        <FollowersCard location = "homePage" />
    </div>
  )
}

export default ProfileSide