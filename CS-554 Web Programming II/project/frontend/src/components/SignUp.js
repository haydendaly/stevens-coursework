import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions'
import { AuthContext } from '../firebase/Auth'
import SocialSignIn from './SocialSignIn'
function SignUp() {
    const { currentUser } = useContext(AuthContext)
    const [error, setError] = useState('')

    const handleSignUp = async (e) => {
        e.preventDefault()
        const {
            displayName,
            email,
            passwordOne,
            passwordTwo,
        } = e.target.elements
        if (passwordOne.value !== passwordTwo.value) {
            setError('Passwords do not match')
            return false
        }

        const isValidName =
            /^[A-Za-z .']+$/i.test(displayName.value) &&
            /^[A-Za-z]/i.test(displayName.value)

        if (!isValidName) {
            setError(
                'Name need to start with letter and cannot contain special characters (space and . are allowed)'
            )
            return false
        }

        try {
            await doCreateUserWithEmailAndPassword(
                email.value,
                passwordOne.value,
                displayName.value
            )
        } catch (error) {
            alert(error)
        }
    }

    if (currentUser) {
        return <Redirect to="/home" />
    }

    return (
        <div className="main">
            <div className="container authorize shadow">
                <h1>Sign Up</h1>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSignUp}>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="displayName"
                        >
                            Name
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                required
                                name="displayName"
                                id="displayName"
                                type="text"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="email-signup"
                        >
                            Email
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                required
                                name="email"
                                id="email-signup"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="passwordOne"
                        >
                            Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                id="passwordOne"
                                name="passwordOne"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label
                            className="col-sm-2 col-form-label"
                            htmlFor="passwordTwo"
                        >
                            Confirm Password
                        </label>
                        <div className="col-sm-10">
                            <input
                                className="form-control"
                                name="passwordTwo"
                                id="passwordTwo"
                                type="password"
                                placeholder="Confirm Password"
                                required
                            />
                        </div>
                    </div>
                    <div className="submit-button">
                        <button
                            className="btn btn-light"
                            id="submitButton"
                            name="submitButton"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <br />
                <SocialSignIn />
            </div>
        </div>
    )
}

export default SignUp
