import React, { useEffect, useState, createContext, useContext } from 'react'
import qs from 'qs'
import _ from 'lodash'
import axios from 'axios'

import Loading from '../components/Loading'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import SpotifyAuth from '../components/SpotifyAuth'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { AuthContext } from '../firebase/Auth'

export const SpotifyContext = createContext()

const client_id = 'd1f357b5e08e444682e89704869b769c' // Your client id
const client_secret = '898b527f70c84fa0b09d45bfbdbb4635' // Your secret

export const SpotifyProvider = ({ children }) => {
    const redirect_uri = `http://${window.location.host}/spotify` // Your redirect uri
    const { currentUser } = useContext(AuthContext)
    const [loadingSpotifyAuthCheck, setLoadingSpotifyAuthCheck] = useState(true)
    const [isSpotifyAuthed, setIsSpotifyAuthed] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    const [spotifyCode, setSpotifyCode] = useState('')

    /* Get auth and refresh token after the user authorizes the app*/
    const getTokens = async (code) => {
        const bodyqs = qs.stringify({
            code,
            redirect_uri,
            grant_type: 'authorization_code',
        })

        const request = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(client_id + ':' + client_secret).toString(
                        'base64'
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: bodyqs,
        }
        const data = await axios(request)
        const { access_token, refresh_token } = data.data

        // Store refresh_token in redis cache using the backend route
        await axios
            .post(
                `http://${window.location.hostname}:3000/refreshToken/set/${currentUser.uid}?refresh_token=${refresh_token}`
            )
            .then((error) => {
                console.log(error)
            })

        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        setLoadingSpotifyAuthCheck(false)
        setIsSpotifyAuthed(true)
    }

    // Obtain a new access token given the refresh token state
    const refreshAccessToken = async () => {
        const bodyqs = qs.stringify({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        })

        const request = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(client_id + ':' + client_secret).toString(
                        'base64'
                    ),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: bodyqs,
        }

        const data = await axios(request)
        setAccessToken(data.data.access_token)
    }

    // data is returned as {exists: false} OR {exists: true, refresh_token=123}
    const getRefreshTokenFromCache = async () => {
        const cachedData = await axios.get(
            `http://${window.location.hostname}:3000/refreshToken/get/${currentUser.uid}`
        )
        return cachedData.data
    }

    /* useEffect to determine if code exists in the redis cache to bypass need to reauthorize */
    useEffect(() => {
        if (!currentUser) {
            return
        }
        const fetchData = async () => {
            const data = await getRefreshTokenFromCache()
            if (data.exists) {
                setIsSpotifyAuthed(true)
                setRefreshToken(data.refresh_token)
                // refreshAccessToken()
            } else {
                setIsSpotifyAuthed(false)
            }
            setLoadingSpotifyAuthCheck(false)
        }
        fetchData()
        // eslint-disable-next-line
    }, [currentUser])

    useEffect(() => {
        if (isSpotifyAuthed && refreshToken !== '') {
            refreshAccessToken()
        }
        // eslint-disable-next-line
    }, [refreshToken, isSpotifyAuthed])

    /* useEffect to obtain authorization code (different from authorization token) from the URL params*/
    useEffect(() => {
        const queries = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        })
        if (_.has(queries, 'code')) {
            const { code } = queries
            setSpotifyCode(code)
        }
        // eslint-disable-next-line
    }, [window.location.search])

    /* useEffect to Parse Redirect Back From Spotify*/
    useEffect(() => {
        if (spotifyCode !== '') {
            getTokens(spotifyCode)
        }
        // eslint-disable-next-line
    }, [spotifyCode])

    if (!currentUser) {
        return (
            <div>
                <Router>
                    <nav className="navigation">
                        <ul>
                            <li>
                                <NavLink
                                    exact
                                    to="/signin"
                                    activeClassName="active"
                                >
                                    Sign In
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    exact
                                    to="/signup"
                                    activeClassName="active"
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/signup" exact component={SignUp} />
                    <Route path="/" exact component={SignIn} />
                </Router>
            </div>
        )
    } else if (!loadingSpotifyAuthCheck && !isSpotifyAuthed) {
        return <SpotifyAuth setAccessToken={setAccessToken} />
    } else if (
        !loadingSpotifyAuthCheck &&
        isSpotifyAuthed &&
        accessToken !== ''
    ) {
        return (
            <SpotifyContext.Provider value={{ accessToken }}>
                {children}
            </SpotifyContext.Provider>
        )
    } else {
        return <Loading />
    }
}
