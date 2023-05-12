import React from 'react'
import "./Auth.css"
import logo from "../../img/logo.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const dispatch = useDispatch()
    const loading = useSelector(state => state.authReducer.loading)
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: ""
    })
    const [passwordMatched, setPasswordMatched] = useState(true)

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignUp) {
            data.password === data.confirmpassword
                ? dispatch(signUp(data))
                : setPasswordMatched(false)
        } else {
            dispatch(logIn(data))
        }
    }
    const resetForm = () => {
        setPasswordMatched(true)
        setData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: ""
        })
    }



    return (
        <div className="auth">
            <div className="a-left">
                <img src={logo} alt="" />
                <div className="webname">
                    <h1>
                        SOCIOLOGY
                    </h1>
                    <h6>
                        A social network for sociologists
                    </h6>
                </div>
            </div>
            {/* <Signup /> */}
            {/* <Login /> */}
            <div className="a-right">
                <form action="" className="infoForm authform" onSubmit={handleSubmit}>
                    <h2>
                        {isSignUp ? "Sign Up" : "Login"}
                    </h2>
                    {isSignUp &&
                        <div>
                            <input type="text" className="infoInput" placeholder='First Name' name='firstname' value={data.firstname} onChange={handleChange} />
                            <input type="text" className="infoInput" placeholder='Last Name' name='lastname' value={data.lastname} onChange={handleChange} />
                        </div>}
                    <div>
                        <input type="text" className="infoInput" placeholder='Username' name='username' value={data.username} onChange={handleChange} />
                    </div>
                    <div>
                        <input type="password" className="infoInput" placeholder='Password' name='password' value={data.password} onChange={handleChange} />
                        {isSignUp && <input type="password" className="infoInput" placeholder='Confirm Password' name='confirmpassword' value={data.confirmpassword} onChange={handleChange} />}

                    </div>
                    <span style={{ "display": passwordMatched ? "none" : "block", "color": "red" }}>
                        Passwords do not match

                    </span>
                    <div>
                        <span style={{ "cursor": "pointer" }} onClick={() => { setIsSignUp(prev => !prev); resetForm() }}>
                            {isSignUp ? "Already have an account?" : "Don't have an account?"}
                        </span>
                    </div>
                    <button className='btn submit-btn' type='submit' disabled={loading}>
                        {
                            loading ? "loading..." : isSignUp ? "Sign Up" : "Login"
                        }
                    </button>
                </form>
            </div>

        </div>
    )
}


export default Auth