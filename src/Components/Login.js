import React, { useState, useContext } from 'react'
import logo from '../img/login_logo.png'
import { Redirect, Link } from 'react-router-dom'
import firebase from 'firebase/app'
import { UserContext } from './UserContext'
import { toast } from 'react-toastify'

const Login = () => {

    const context = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')

    const handleForm = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => {
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
        handleForm()
    }

    if (context.user?.uid) {
        return <Redirect to='/' />
    }


    return (
        <div className="login_wrapper">
            <div className="login_logo">
                <Link to='/'><img src={logo} alt="" /></Link>
            </div>
            <div className="login_form">
                <h2>Sign-In</h2>
                <form onSubmit={submitForm} className="login-form_content">
                    <div>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="text" onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" placeholder="Enter your email..." autoComplete="off" />
                    </div>

                    <div>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" onChange={(e) => { setPasssword(e.target.value) }} id="password" name="password" placeholder="Enter your password..." />
                    </div>
                    <div>
                        <button className="loginBtn">Continue</button>
                    </div>
                    <p className="conditions">
                        By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>
                    </p>
                    <div className="help">
                        <a href="#">Need Help ?</a>
                    </div>
                </form>
            </div>

            <div className="signup-link">
                <p>New to Amazon ?</p>
                <Link to='/register' className="create_acc">Create your Amazon account</Link>
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

export default Login
