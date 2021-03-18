import React, { useState, useContext } from 'react'
import logo from '../img/login_logo.png'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import { UserContext } from './UserContext'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {

    const context = useContext(UserContext)

    // const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleForm = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res)
                context.setUser({
                    email: res.user.email,
                    uid: res.user.uid
                })

            })
            .catch(error => {
                console.log(error)
                toast(error.message, { type: 'error' })
            })
    }

    const submitForm = (e) => {
        e.preventDefault();
        handleForm();
    }

    if (context.user?.uid) {
        return <Redirect to='/login' />
    }

    return (
        <div className="login_wrapper">
            <div className="login_logo">
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>
            <div className="login_form">
                <h2>Create Account</h2>
                <form onSubmit={submitForm} className="login-form_content">
                    {/* <div>
                        <label htmlFor="name"><strong>Your Name</strong></label>
                        <input type="text" onChange={(e) => { setName(e.target.value) }} id="name" name="name" placeholder="Enter your name..." autoComplete="off" />
                    </div> */}
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" placeholder="Enter your email..." autoComplete="off" />
                    </div>

                    <div id="pass_span">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" placeholder="Enter your password..." />
                        <p><span>i</span> Password must be atleast 6 characters</p>
                    </div>
                    <p className="conditions">
                        We will send you a mail to verify your email.
                </p>
                    <div>
                        <button type="submit" className="loginBtn">Continue</button>
                    </div>

                    <div className="already">
                        <p>Already have an account? <Link to='/login'>Sign In <i className="fa fa-chevron-right"></i></Link></p>
                        <p>Buying for work? <a href="#">Create a free business account <i className="fa fa-chevron-right"></i></a></p>
                    </div>
                </form>
            </div>



            <div className="policies">
                <a href="#">Conditions of Use</a>
                <a href="#">Privacy Notice</a>
                <a href="#">Help</a>
            </div>
            <div className="login_footer">
                <p>
                    © 1996-2021, Amazon-clone.
            </p>
            </div>
        </div>
    )
}

export default Register
