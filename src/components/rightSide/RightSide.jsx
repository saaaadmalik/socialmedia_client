import React from 'react'
import "./RightSide.css"
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from "../../img/comment.png"
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../trendCard/TrendCard'
import { useState } from 'react'
import ShareModal from '../shareModal/ShareModal'
import { Link } from 'react-router-dom'

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className="rightSide">

      <div className="navIcons">
        <Link to="../home"><img src={Home} alt="" /></Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <Link to = "../chat">
        <img src={Comment} alt="" />
        </Link>
      </div>

      <TrendCard />
      <button className='btn r-btn' onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

    </div>
  )
}

export default RightSide