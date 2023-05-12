import { upperFirst } from '@mantine/hooks'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import * as UserApi from "../../api/UserRequest"
import "./ProfileCard.css"

const ProfileCard = ({ location }) => {

    const params = useParams()

    const { user } = useSelector((state) => state.authReducer.authData)
    // console.log(user)
    const { posts } = useSelector((state) => state.timelinepostReducer)



    const [profileUser, setProfileUser] = useState(user)

    let profileUserId;

    if (location === "profilePage") {
        profileUserId = params.id;      
    }
    if (location === "homePage"){
        profileUserId = user._id;
    }
    // console.log(profileUserId)

    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (location === "profilePage") {
            profileUserId = params.id;
            const fetchProfileUser = async () => {
                try {
                    if (profileUserId === user._id) {
                        setProfileUser(user)
                        // console.log(user)
                    } else {
                        const { data } = await UserApi.getUser(profileUserId)
                        setProfileUser(data)
                        // console.log(data)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchProfileUser();
            // console.log(profileUser)
        } else {
            profileUserId = user._id;
            setProfileUser(user)
            // console.log(profileUser)
        }
    }, [user, profileUserId, params.id, location])

    

    console.log(profileUser.following.length)
    return (
        <div className="profileCard">
            {/* {console.log(profileUser)} */}
            <div className="profileImages">
                <img style = {location === "profilePage"?{height:"23rem"}:{height:"auto"}} src={profileUser.coverpicture ? serverPublic + profileUser.coverpicture : serverPublic + "defaultCover.jpeg"} alt="" />
                <img src={profileUser.profilepicture ? serverPublic + profileUser.profilepicture : serverPublic + "defaultProfile.jpeg"} alt="" />

            </div>
            <div className="profileName">
                <span>{upperFirst(profileUser.firstname)}  {upperFirst(profileUser.lastname)}</span>
                <span>{profileUser.worksat ? profileUser.worksat : "Beginner"}</span>
            </div>
            <div className="followStatus">
                <hr />
                <div >
                    <div className="follow">
                        <span>{profileUser.following.map((following)=> following).length}</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{profileUser.followers.map((followers)=> followers).length}</span>
                        <span>Followers</span>
                    </div>
                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.filter((post) => post.userId === profileUser._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}

                </div>
                <hr />

            </div>
            {location === "profilePage" ? "" : <span>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>  My Profile</Link>
            </span>}


        </div>
    )
}

export default ProfileCard