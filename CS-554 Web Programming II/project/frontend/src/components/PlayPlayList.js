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
        fontSize: 22,
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

const PlayByPlayList = (props) => {
    const { accessToken } = useContext(SpotifyContext)
    const [playListData, setPlayListData] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [albumId, setAlbumId] = useState(props.match.params.id)
    const [errorModal, setErrorModal] = useState(false)

    let card = null
    const baseUrl = `http://${window.location.hostname}:3000/spotify-api/playlists/`

    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    baseUrl +
                        props.match.params.id +
                        '?access_token=' +
                        accessToken
                )
                setPlayListData(data)
                setLoading(false)
            } catch (e) {
                console.log(e)
                setHasError(e)
            }
        }
        fetchData()
    }, [props.match.params.id])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
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
                            width="auto"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        ></iframe>
                        <div className="e-card-actions e-card-vertical">
                            <div
                                onClick={() => {
                                    handleOpenshareModal(album)
                                }}
                                className="share-button shadow"
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
            </div>
        )
    }
    if (playListData) {
        card = playListData && playListData
        return buildCard(playListData)
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
            </div>
        )
    }
}

export default PlayByPlayList
