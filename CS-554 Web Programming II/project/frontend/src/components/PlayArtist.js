import React, { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
} from '@material-ui/core'

import { AuthContext } from '../firebase/Auth'
import Loading from './Loading'
import AddPostModal from './Modals/AddPostModal'
import ShowErrorModal from './Modals/ShowErrorModal'
import axios from 'axios'
import { SpotifyContext } from '../functions/Spotify'

const useStyles = makeStyles({
    sidebarCard: {
        maxWidth: '100%',
        height: '100%',
        marginTop: '12px',
    },
    card: {
        background: '#191919',
        marginTop: '10%',
        maxWidth: 350,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 30,
        overflow: 'hidden',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.6);',
    },
    titleHead: {
        fontWeight: 'bold',
        color: 'white !important',
    },
    grid: {
        marginTop: '2%',
        flexGrow: 1,
        flexDirection: 'row',
        textAlign: 'center',
    },
    modal: {
        top: '50%',
        left: '20%',
        right: 'auto',
        // bottom: '90%',
        marginRight: '50%',
        transform: 'translate(10%, -50%)',
        width: '50%',
        // border: '1px solid #28547a',
        borderRadius: '4px',
        float: 'left',
        // background:'lightblue'
    },

    textFieldStyle: {
        left: '.5%',
        right: '.5%',
        top: '.5%',
        bottom: '25%',
        width: '90%',
        margin: 'auto',
        background: 'white',
    },

    buttonClass: {
        justifyContent: 'center',
        marginBottom: '5%',
        marginTop: '5%',
    },

    h3class: {
        display: 'block',
        fontSize: '1.17em',
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '0',
        marginRight: '0',
        fontWeight: 'bold',
    },
})

const PlayByArtist = (props) => {
    const { accessToken } = useContext(SpotifyContext)
    const [artistData, setArtistDataa] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [artistId, setAristId] = useState(props.match.params.id)
    const [errorModal, setErrorModal] = useState(false)
    const [topTrack, setTopTrack] = useState(null)
    const [artistAlbum, setArtistAlbum] = useState(null)

    let card = null
    let toptracksCard = null
    const baseUrl = `http://${window.location.hostname}:3000/spotify-api/artists/`

    const { currentUser } = useContext(AuthContext)
    // setAristId(props.match.params.id);

    let artist = props.match.params.id

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    baseUrl + artistId + '?access_token=' + accessToken
                )
                setAristId(props.match.params.id)
                setArtistDataa(data)
                setTopTrack(null)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setHasError(e)
            }
        }
        fetchData()
    }, [props.match.params.id])

    const albumUrl = `http://${window.location.hostname}:3000/spotify-api/artists/`
    useEffect(() => {
        async function fetchAlbumData() {
            try {
                setAristId(props.match.params.id)
                const { data } = await axios.get(
                    albumUrl +
                        artistAlbum +
                        '/albums?country=US&access_token=' +
                        accessToken
                )
                setTopTrack(data.items)
                if (data && data.items && data.items.length > 0) {
                    setArtistDataa(null)
                }
                setLoading(false)
            } catch (e) {
                console.log(e)
                setHasError(e)
            }
        }
        fetchAlbumData()
    }, [artistAlbum])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const handleTopTracks = (id) => {
        setArtistAlbum(id)
    }

    const backtoArtist = (id) => {
        setAristId(id)
    }

    const buildCard = (album) => {
        return (
            <div className="main">
                <Grid
                    className={classes.grid}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    key={album.id}
                >
                    <Card className={classes.card} variant="outlined">
                        <CardActionArea>
                            <CardContent>
                                <div className={classes.titleHead}>
                                    {album.name}
                                </div>
                            </CardContent>
                        </CardActionArea>
                        <iframe
                            id="playSong"
                            src={
                                'https://open.spotify.com/embed?uri=' +
                                album.uri
                            }
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        />
                        <div className="e-card-actions e-card-vertical">
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row ',
                                }}
                            >
                                <div
                                    className="share-button"
                                    onClick={() => {
                                        handleOpenshareModal(album)
                                    }}
                                >
                                    Share
                                </div>
                                <div
                                    onClick={() => handleTopTracks(artistId)}
                                    className="share-button shadow"
                                >
                                    More
                                </div>
                            </div>
                            {currentUser
                                ? showSharePostModal && (
                                      <AddPostModal
                                          isOpen={showSharePostModal}
                                          handleClose={handleCloseModals}
                                          title={'Share Post'}
                                          data={null}
                                          currentUser={currentUser.uid}
                                          songData={sharePost}
                                          postId={null}
                                      />
                                  )
                                : errorModal && (
                                      <ShowErrorModal
                                          isOpen={errorModal}
                                          handleClose={handleCloseModals}
                                          title={'Login Error'}
                                      />
                                  )}
                        </div>
                    </Card>
                </Grid>
            </div>
        )
    }

    const buildtopCard = (album) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={album.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.titleHead}>
                                {album.name}
                            </div>
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={'https://open.spotify.com/embed?uri=' + album.uri}
                        width="300"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    />
                    <div className="e-card-actions e-card-vertical">
                        <div
                            className="share-button"
                            onClick={() => {
                                handleOpenshareModal(album)
                            }}
                        >
                            Share
                        </div>
                        {currentUser
                            ? showSharePostModal && (
                                  <AddPostModal
                                      isOpen={showSharePostModal}
                                      handleClose={handleCloseModals}
                                      title={'Share Post'}
                                      data={null}
                                      currentUser={currentUser.uid}
                                      songData={sharePost}
                                      postId={null}
                                  />
                              )
                            : errorModal && (
                                  <ShowErrorModal
                                      isOpen={errorModal}
                                      handleClose={handleCloseModals}
                                      title={'Login Error'}
                                  />
                              )}
                    </div>
                </Card>
            </Grid>
        )
    }
    if (artistData) {
        card = artistData && artistData
        return buildCard(artistData)
    } else if (topTrack && topTrack.length > 0 && artistAlbum) {
        toptracksCard =
            topTrack &&
            topTrack.map((album) => {
                return buildtopCard(album)
            })
    }

    if (loading) {
        return <Loading />
    }
    if (hasError) {
        return <div>{hasError}</div>
    } else {
        return (
            <div className="main">
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                <Grid container className={classes.grid} spacing={5}>
                    {toptracksCard}
                </Grid>
            </div>
        )
    }
}

export default PlayByArtist
