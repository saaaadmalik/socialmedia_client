import React from 'react'
import "./FollowersCard.css"
import { followersData } from '../../Data/FollowersData'
import User from '../user/User'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUser } from '../../api/UserRequest'

const FollowersCard = ({location}) => {
    // console.log(location)
    const [persons, setPersons] = useState([])
    const { user } = useSelector((state) => state.authReducer.authData)

    useEffect(() => {
        const fetchPersons = async () => {
            const { data } = await getAllUser()
            setPersons(data)
            // console.log(data)
        }
        fetchPersons()
    }, [])
    return (
        <>
        {location == "homePage" && (
            <div className="followersCard">
            <h3>People you may know</h3>
            {/* {followersData.map((person, id) => {
                return (
                    <User person={person} key={id} />
                )
            })} */}
            {persons.map((person, id) => {
                if (person._id !== user._id) return (
                    <User person={person} key={id} />
                    )
                   
            })}
        </div>)}
        </>
    )
}

export default FollowersCard