import React, { useEffect } from 'react'
import "./InfoCard.css"
import {UilPen} from '@iconscout/react-unicons'
import { useState } from 'react'
import ProfileModal from '../profileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from "../../api/UserRequest"
import { logOut } from '../../actions/AuthAction'

const InfoCard = () => {
    const [modalOpened,setModalOpened] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()

    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({})

    const {user} = useSelector((state)=>state.authReducer.authData)

    useEffect(()=>{
        const fetchProfileUser = async()=>{
            if(profileUserId === user._id){
                setProfileUser(user)
                // console.log(profileUser)
            }else{
                const {data} = await UserApi.getUser(profileUserId)
                setProfileUser(data)
                // console.log(data)

            }
        }
        fetchProfileUser();
    },[user,profileUserId])

    const handleLogOut =()=>{
        dispatch(logOut())
    }
  return (
    <div className="infoCard">
        <div className="infoHead">
            <h3>Profile  Info</h3>
            {profileUserId === user._id ? (
                <div>
                <UilPen onClick={()=> setModalOpened(true)}/>
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data= {user}/>
    
                </div>
            ):("")}
        </div>

        <div className="info">
            <span>
                <b>Status: </b>
            </span>
            <span> {profileUser.relationship}</span>
        </div>

        <div className="info">
            <span>
                <b>Lives in: </b>
            </span>
            <span> {profileUser.livesin}</span>
        </div>

        <div className="info">
            <span>
                <b>Profession: </b>
            </span>
            <span> {profileUser.worksat}</span>
        </div>
        {profileUserId === user._id ? (
            <button className='btn lg-btn' onClick={handleLogOut}>Logout</button>
        ) : ("")}

    </div>
  )
}

export default InfoCard