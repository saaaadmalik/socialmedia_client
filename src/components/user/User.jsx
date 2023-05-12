import React, { useState } from 'react'
import "../followersCard/FollowersCard.css"
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/userAction';
import { Link } from 'react-router-dom';

const User = ({ person }) => {
    const dispatch = useDispatch()
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user } = useSelector((state) => state.authReducer.authData)
    const [following, setFollowing] = useState(person.followers.includes(user._id))


    const handleFollow = () => {
        following ?
            dispatch(unfollowUser(person._id, user)) :
            dispatch(followUser(person._id, user))
        setFollowing((prev) => !prev)

    }
    return (
        <div className="follower">
            <div>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${person._id}`}>
                    <img src={person.profilepicture ? serverPublic + person.profilepicture : serverPublic + "defaultProfile.jpeg"} alt="" className='followerImg' />
                </Link>
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button className={following ? " unfollowbutton" : "btn fc-btn"} onClick={handleFollow}>{following ? "Unfollow" : "Follow"}</button>
        </div>
    )
}

export default User