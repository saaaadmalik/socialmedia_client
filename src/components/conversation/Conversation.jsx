import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({ data, currentUserId,online }) => {

    const [userData, setUserData] = useState(null) //other user

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)  //other user id
        // console.log(userId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                // console.log(data)

            } catch (error) {
                console.log(error)
            }

        }
        getUserData()

    }, [])


    return (
        <>
        <div className="follower conversation">
            <div>
                {online === true ? <div className="online-dot">
                </div>: ""}
                <img src={userData?.profilepicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilepicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpeg"} className="followerImg" />
                <div className="name">
                    <span>{userData?.firstname.charAt(0).toUpperCase() + userData?.firstname.slice(1)} {userData?.lastname.charAt(0).toUpperCase() + userData?.lastname.slice(1)}</span>
                    <span>{online ? "Online" : "Offline"}</span>
                </div>
            </div>

        </div>
        <hr style={{width: "85%", border:"0.1px solid #ececec"}}/>
        </>
    )
}

export default Conversation