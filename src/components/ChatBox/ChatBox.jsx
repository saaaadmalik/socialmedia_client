import React, { useEffect, useRef, useState } from 'react'
import "./ChatBox.css"
import { getUser } from '../../api/UserRequest'
import { addMessage, getMessages } from '../../api/MessageRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import chat2 from "../../img/chat2.png"


const ChatBox = ({ chat, currentUserId, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null) //other user
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const scroll = useRef()



    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }

    }, [receiveMessage])
    //fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUserId)  //other user id

        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                // console.log(data)

            } catch (error) {
                console.log(error)
            }

        }
        if (chat !== null) {
            getUserData()
        }
    }, [chat, currentUserId])

    //fetching data for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                // console.log(data)
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) {
            fetchMessages()
        }

    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)

    }
    const handleSend = async (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUserId,
            text: newMessage,
            chatId: chat._id
        }
        //send message to the database

        try {
            const { data } = await addMessage(message)
            setMessages([...messages, data])
            setNewMessage("")

        } catch (error) {
            console.log(error)
        }

        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUserId)
        setSendMessage({ ...message, receiverId })


    }
    

    //always scroll to last message
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower ">
                                <div>

                                    <img src={userData?.profilepicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilepicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.jpeg"} className="followerImg" />
                                    <div className="name">
                                        <span>{userData?.firstname.charAt(0).toUpperCase() + userData?.firstname.slice(1)} {userData?.lastname.charAt(0).toUpperCase() + userData?.lastname.slice(1)}</span>

                                    </div>
                                </div>

                            </div>
                            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                        </div>
                        {/* Chatbox message */}
                        <div className="chat-body">
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll} className={message.senderId === currentUserId ? "message own" : "message"}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>

                                    </div>
                                </>
                            ))}

                        </div>
                        {/* {chat sender} */}
                        <div className="chat-sender">
                            <div>+</div>
                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange}
                                
                                
                            />
                            <div className="btn" onClick={handleSend} >Send</div>
                        </div>


                    </>
                ) : (
                    <>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "84vh" }}>
                            <img src={chat2} alt="" style={{ width: "22%", opacity: "0.7", borderRadius: "50%" }} />
                            <h4 style={{ color: "#0099a9" }}>Please select a conversation to start chatting...</h4>
                        </div>

                    </>)}

            </div>
        </>
    )
}

export default ChatBox