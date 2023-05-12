import React, { useState, useRef } from 'react'
import "./PostShare.css"
import saadmalik from "../../img/saadmalik.jpg"
import UilScenery from '@iconscout/react-unicons/icons/uil-scenery'
import UilPlayCircle from '@iconscout/react-unicons/icons/uil-play-circle'
import UilLocationPoint from '@iconscout/react-unicons/icons/uil-location-point'
import UilSchedule from '@iconscout/react-unicons/icons/uil-schedule'
import UilTimes from '@iconscout/react-unicons/icons/uil-times'
import { useSelector, useDispatch } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/uploadAction'


const PostShare = ({location}) => {
    // console.log(location)
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const loading = useSelector((state) => state.postReducer.uploading)
    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const { user } = useSelector((state) => state.authReducer.authData)
    const desc = useRef()

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0]
            setImage(img)
        }
    }

    const reset = ()=>{
        setImage(null);
        desc.current.value = "";
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPost = {
            userId: user._id,
            desc: desc.current.value,

        }
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            // console.log(newPost)
            try {
                dispatch(uploadImage(data))
            } catch (error) {
                console.log(error)

            }
        }
        dispatch(uploadPost(newPost))
        reset()

    }

    return (
        <>
        {location === "homePage" &&(
            <div className="postShare">
            <img src={user.profilepicture?serverPublic + user.profilepicture:serverPublic + "defaultProfile.jpeg"} alt="" />
            <div>
                <input type="text" placeholder="What's in your mind?" ref={desc} required />
                <div className='postOptions'>
                    <div className="option"
                        style={{ color: "var(--photo)" }}
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery className="icon" />
                        Photo
                    </div>
                    <div className="option"
                        style={{ color: "var(--video)" }}>
                        <UilPlayCircle className="icon" />
                        Video
                    </div>
                    <div className="option"
                        style={{ color: "var(--location)" }}>
                        <UilLocationPoint className="icon" />
                        Location
                    </div>
                    <div className="option"
                        style={{ color: "var(--schedule)" }}>
                        <UilSchedule className="icon" />
                        Schedule
                    </div>
                    <button className='btn ps-btn' onClick={handleSubmit} disabled={loading}>
                        {loading ? "Uploading..." : "Share"}
                    </button>
                    <div style={{ display: "none" }}>
                        <input
                            type="file"
                            name="myImage"
                            ref={imageRef}
                            onChange={onImageChange} />
                    </div>

                </div>
                {image &&
                    <div className="previewImage">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                }


            </div>
        </div >
        )}
        </>
    )
}

export default PostShare