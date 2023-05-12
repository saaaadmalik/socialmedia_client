import React from 'react'
import "./Post.css"
import Comment from "../../img/comment.png"
import Like from "../../img/like.png"
import NotLike from "../../img/notlike.png"
import Share from "../../img/share.png"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../api/PostRequest'
import { useEffect } from 'react'
import * as UserApi from "../../api/UserRequest"
import { upperFirst } from '@mantine/hooks'

const Post = ({data, id}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const[likes, setLikes] = useState(data.likes.length)

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const handleLike = ()=>{
    setLiked((prev)=>!prev)
    likePost(data._id, user._id)
    liked?setLikes((prev)=>prev-1):setLikes((prev)=>prev+1)
  }

  const [postUser, setPostUser] = useState({})

  useEffect(()=>{
    const fetchPostUser = async ()=>{
      try {
        const postUser = await UserApi.getUser(data.userId)
        setPostUser(postUser.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPostUser()
  },[]) 
  console.log(postUser)


  return (
    <div className="post">
      <div className="postDetail" style={{display:"flex", alignItems:"center"}} >
      <img src={postUser.profilepicture ? serverPublic + postUser.profilepicture : serverPublic + "defaultProfile.jpeg"} alt="" className='followerImg' style={{width:"3rem", height:"3rem"}} />
            <span><b>{upperFirst(postUser.username)}: &nbsp;&nbsp; </b></span>
            <span>{data.desc}</span>
        </div>
      {data.image?
      <img src={process.env.REACT_APP_PUBLIC_FOLDER + data.image} alt="" />:
      null
      // {console.log(data)}
      }
      
        {/* <img src={data.img? process.env.REACT_APP_PUBLIC_FOLDER + data.image:""} alt="" /> */}
        {/* {console.log(process.env.REACT_APP_PUBLIC_FOLDER + data.image)} */}
        


        <div className="postReact">
            <img src={liked?Like:NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike} />
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>

        <span style={{color:"var(--gray)"}}>{likes} likes</span>

        

    </div>
  )
}

export default Post