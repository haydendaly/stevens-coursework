import React, { useContext, useState, useEffect } from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
    makeStyles,
} from '@material-ui/core'
import SpotifyWebApi from 'spotify-web-api-js'

import { AuthContext } from '../firebase/Auth'
import Loading from './Loading'
import AddPostModal from './Modals/AddPostModal'

let spotifyApi = new SpotifyWebApi()

spotifyApi.setAccessToken(
    'BQBzVb1VQn20pxWFtP63bRzK3Zjl9APTx7Ncn8qZ6x34ULjGsefsTYmLoqPTLWY1Q_NFpwccm1C_XFb2K4NoJlqDZkruMf9nD4db-EQCNwaIL_3W_uAUmZQdMbi8D0Gjyc1Qh26wDD_0nrTccDq_ba7IXaMjQ124feTF7y_Pee4kkxppIjShXxrzU_BakWoiQs99wsZ6wBfIrd2PQDcMlNAozGc'
)

const useStyles = makeStyles({
    card: {
        maxWidth: 350,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.6);',
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
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
        marginLeft: '40%',
    },
})

const PlayLoveSongs = (props) => {
    const [playListData, setPlayListData] = useState(undefined)
    const classes = useStyles()
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)

    const { currentUser } = useContext(AuthContext)

    let card = null
    useEffect(() => {
        async function fetchData() {
            try {
                spotifyApi.searchTracks('Love', { country: 'us' }).then(
                    function (data) {
                        setPlayListData(data.tracks.items)
                        setLoading(false)
                    },
                    function (err) {
                        setHasError(err)
                    }
                )
            } catch (e) {
                setHasError(e.message)
            }
        }
        fetchData()
    }, [])

    const handleOpenshareModal = (trackDetails) => {
        setShowSharePostModal(true)
        setSharePost(trackDetails)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
    }

    const buildCard = (playList) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={2} key={playList.id}>
                <Card className={classes.card} variant="outlined">
                    <CardActionArea>
                        <a href={playList.external_urls.spotify}>
                            Go to Spotify
                        </a>
                        <CardContent>
                            <Typography
                                className={classes.titleHead}
                                gutterBottom
                                variant="h6"
                                component="h3"
                            >
                                <span>{playList.name}</span>
                                <br />
                                <span>Popularity: {playList.popularity}</span>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <iframe
                        id="playSong"
                        src={
                            'https://open.spotify.com/embed?uri=' + playList.uri
                        }
                        width="300"
                        height="380"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                    <div
                        onClick={() => {
                            handleOpenshareModal(playList)
                        }}
                        className="share-button shadow"
                    >
                        Share
                    </div>
                    {showSharePostModal && (
                        <AddPostModal
                            isOpen={showSharePostModal}
                            handleClose={handleCloseModals}
                            title={'Share Post'}
                            data={null}
                            currentUser={currentUser.uid}
                            songData={sharePost}
                            postId={null}
                        />
                    )}
                </Card>
            </Grid>
        )
    }
    if (playListData) {
        card =
            playListData &&
            playListData
                .filter((x) =>
                    x.available_markets.some((y) => y.includes('US'))
                )
                .map((playList) => {
                    return buildCard(playList)
                })
    }

    if (loading) {
        return <Loading />
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

export default PlayLoveSongs
