import React from 'react'
import "./Posts.css"
import { postsData } from '../../Data/PostsData'
import Post from '../post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)
  // console.log(user)
  let {posts,loading} = useSelector((state)=>state.timelinepostReducer)
  // console.log(posts)
  
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[dispatch , user._id])

  if(posts.length===0){
    return <div className="posts">No posts to show</div>
  }
  if(params.id){
    posts = posts.filter((post)=>post.userId===params.id)
  }

  return (
    <div className="posts">
        {loading?"Fetching posts...":
        posts.map((post,id)=>{
            return <Post data={post} id={id}/>
        })}
    </div>
  )
}

export default Posts