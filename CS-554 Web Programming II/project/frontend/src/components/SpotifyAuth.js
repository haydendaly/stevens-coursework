import { useState, useEffect, useContext } from 'react'
import qs from 'qs'
import axios from 'axios'
import { AuthContext } from '../firebase/Auth'
import Loading from './Loading'
import SignOut from './SignOut'

const getLink = () => {
    const client_id = 'd1f357b5e08e444682e89704869b769c' // Your client id
    // const client_secret = '898b527f70c84fa0b09d45bfbdbb4635'; // Your secret
    const redirect_uri = `http://${window.location.host}/spotify` // Your redirect uri

    const scope =
        'user-read-recently-played user-read-playback-state user-top-read app-remote-control user-read-currently-playing user-follow-read user-read-playback-position playlist-read-private user-read-email user-read-private user-library-read streaming'

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    const generateRandomString = function (length) {
        let text = ''
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    let state = generateRandomString(16)

    const querystring = qs.stringify({
        client_id,
        response_type: 'code',
        redirect_uri,
        scope,
        state,
    })

    const url = `https://accounts.spotify.com/authorize?${querystring}`

    return url
}

const SpotifyAuth = () => {
    const [link, setLink] = useState('')
    const { currentUser } = useContext(AuthContext)
    const [user, setUser] = useState(null)
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

    useEffect(() => {
        const tempLink = getLink()
        setLink(tempLink)
    }, [])

    if (user) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <div>
                    <h1>Welcome, {user.displayName.split(' ')[0]}!</h1>
                    <p>Connect with your Spotify account to get started.</p>

                    <a
                        type="button"
                        href={link}
                        className="btn btn-success spotify-btn"
                    >
                        <img
                            src="/imgs/social_media_icon/Spotify.png"
                            width="25px"
                            height="25px"
                        ></img>{' '}
                        Login with Spotify
                    </a>

                    <p>Or</p>

                    <div>
                        <SignOut />
                    </div>
                </div>
            </div>
        )
    } else {
        return <Loading />
    }
}

export default SpotifyAuth
