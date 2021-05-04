import React, { useState, useEffect } from 'react'
import firebaseApp from './Firebase'
import Loading from '../components/Loading'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setLoadingUser(false)
        })
    }, [])

    if (loadingUser) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}
