import React, { lazy, Suspense } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import { AuthProvider } from '../firebase/Auth'
import Sidebar from '../components/Sidebar'
import SidebarRight from '../components/SidebarRight'
import Loading from '../components/Loading'
import { SpotifyProvider } from '../functions/Spotify'
import PlayMusic from '../components/PlayMusic'

const SignIn = lazy(() => import('../components/SignIn'))
const SignUp = lazy(() => import('../components/SignUp'))
const PlayByAlbum = lazy(() => import('../components/PlayAlbums'))
const PlayByArtist = lazy(() => import('../components/PlayArtist'))
const PlayByTracks = lazy(() => import('../components/PlayTracks'))
const PlayByPlayList = lazy(() => import('../components/PlayPlayList.js'))
const PostInsert = lazy(() => import('../pages/PostInsert'))
const UserProfile = lazy(() => import('../pages/UserProfile'))
const ChangePassword = lazy(() => import('../components/ChangePassword'))

function App() {
    return (
        <AuthProvider>
            <SpotifyProvider>
                <Router>
                    <Sidebar />
                    <SidebarRight />
                    <Suspense fallback={<Loading />}>
                        <Switch>
                            <Route path="/posts" exact component={PostInsert} />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/music" exact component={PlayMusic} />
                            <Route
                                path="/album/:id"
                                exact
                                component={PlayByAlbum}
                            />
                            <Route
                                path="/artist/:id"
                                exact
                                component={PlayByArtist}
                            />
                            <Route
                                path="/track/:id"
                                exact
                                component={PlayByTracks}
                            />
                            <Route
                                path="/playlist/:id"
                                exact
                                component={PlayByPlayList}
                            />
                            <Route
                                path="/profile/edit"
                                exact
                                component={() => (
                                    <UserProfile page="EditProfile" />
                                )}
                            />
                            <Route
                                path="/profile/password"
                                exact
                                component={ChangePassword}
                            />
                            <Route
                                path="/profile"
                                exact
                                component={() => (
                                    <UserProfile page="ShowProfile" />
                                )}
                            />
                            <Route path="/">
                                <Redirect to="/posts" />
                            </Route>
                        </Switch>
                    </Suspense>
                </Router>
            </SpotifyProvider>
        </AuthProvider>
    )
}

export default App
