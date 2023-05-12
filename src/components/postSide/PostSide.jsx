import React from 'react'
import Posts from '../posts/Posts'
import PostShare from '../postShare/PostShare'
import "./PostSide.css"

const PostSide = ({location}) => {
  // console.log(location)
  return (
    <div className="postSide">
         <PostShare location= {location}/>
        <Posts />
    </div>
  )
}

export default PostSide