import React from 'react'
import { doSignOut } from '../firebase/FirebaseFunctions'

const SignOutButton = () => {
    return (
        <button type="button" onClick={doSignOut} className="btn btn-light">
            Sign Out
        </button>
    )
}

export default SignOutButton
