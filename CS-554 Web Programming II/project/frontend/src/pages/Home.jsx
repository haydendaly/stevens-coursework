import { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import { AuthContext } from '../firebase/Auth'
import { SpotifyContext } from '../functions/Spotify'

function Home(props) {
    const { currentUser } = useContext(AuthContext)
    const { accessToken } = useContext(SpotifyContext)

    const [user, setUser] = useState(null)
    const [spotifyAccessToken, setSpotifyAccessToken] = useState(null)
    const [count, setCount] = useState(0)

    /* useEffect to obtain current user */
    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `http://${window.location.hostname}:3000/api/user/${currentUser.uid}`
                )

                setUser(data)
            } catch (e) {
                console.log(`error found : ${e}`)
                setCount(count + 1)
            }
        }
        if (currentUser) {
            getUserData()
        }
    }, [currentUser, count])

    /* useEffect to obtain current spotify user */
    useEffect(() => {
        setSpotifyAccessToken(accessToken)
    }, [accessToken])

    if (user) {
        return (
            <div className="main">
                <p>Welcome, {user.displayName}</p>
                <p>Connecting world of music.....</p>
            </div>
        )
    } else {
        return (
            <div className="main">
                <p>Connecting world of music.....</p>
            </div>
        )
    }
}

export default Home
