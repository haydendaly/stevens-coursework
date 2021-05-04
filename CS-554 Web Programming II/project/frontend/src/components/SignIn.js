import React, { useContext } from 'react'
import SocialSignIn from './SocialSignIn'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../firebase/Auth'
import {
    doSignInWithEmailAndPassword,
    doPasswordReset,
} from '../firebase/FirebaseFunctions'

function SignIn() {
    const { currentUser } = useContext(AuthContext)
    const handleLogin = async (event) => {
        event.preventDefault()
        let { email, password } = event.target.elements

        try {
            await doSignInWithEmailAndPassword(email.value, password.value)
        } catch (error) {
            alert(error)
        }
    }

    const passwordReset = async (event) => {
        event.preventDefault()
        let email = document.getElementById('email').value
        if (email) {
            await doPasswordReset(email)
            alert('Password reset email was sent')
        } else {
            alert(
                'Please enter an email address below before you click the forgot password link'
            )
        }
    }
    if (currentUser) {
        return <Redirect to="/home" />
    }
    return (
        <div className="main">
            <div className="container authorize shadow">
                <h1>Log In To Your Account</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                name="email"
                                id="email"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                name="password"
                                id="password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="submit-button">
                        <button type="submit" className="btn btn-light">
                            Log In
                        </button>

                        <button
                            className="forgotPassword"
                            onClick={passwordReset}
                        >
                            Forgot Password
                        </button>
                    </div>
                </form>

                <br />
                <SocialSignIn />
            </div>
        </div>
    )
}

export default SignIn
