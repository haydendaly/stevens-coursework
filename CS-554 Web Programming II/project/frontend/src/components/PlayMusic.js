import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useWindowDimensions } from '../functions/dimensions'
import { SpotifyContext } from '../functions/Spotify'
import { AuthContext } from '../firebase/Auth'
import AddPostModal from './Modals/AddPostModal'
import ShowErrorModal from './Modals/ShowErrorModal'
import Loading from '../components/Loading'

import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
} from '@material-ui/core'

const types = ['album', 'artist', 'playlist', 'track']

const useStyles = makeStyles({
    card: {
        background: '#191919',
        marginTop: '10%',
        maxWidth: 350,
        padding: 30,
        paddingBottom: 10,
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
        flexGrow: 1,
        flexDirection: 'row',
    },
})

const usePlayMusic = () => {
    const { accessToken } = useContext(SpotifyContext)
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const { width } = useWindowDimensions()
    const [searchType, setSearchType] = useState('track')

    const baseUrl = `http://${window.location.hostname}:3000/spotify-api/search?q=`

    useEffect(() => {
        const value = search === '' ? 'A' : search
        const url =
            baseUrl +
            value
                .toLowerCase()
                .split(' ')
                .filter((word) => !types.includes(word))
                .join(' ') +
            '&type=track,album,playlist,artist&market=US&access_token=' +
            accessToken

        axios
            .get(url)
            .then(({ data }) => {
                if (searchType === 'album') {
                    setResults(data.albums.items)
                } else if (searchType === 'artist') {
                    setResults(data.artists.items)
                } else if (searchType === 'playlist') {
                    setResults(data.playlists.items)
                } else if (searchType === 'track') {
                    setResults(data.tracks.items)
                } else {
                    let res = data.playlists.items || []
                    res = res.concat(data.artists.items || [])
                    res = res.concat(data.albums.items || [])
                    res = res.concat(data.tracks.items || [])
                    setResults(res)
                    setSearchType('all')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [search, searchType])

    return {
        search,
        setSearch,
        results,
        width,
        searchType,
        setSearchType,
        classes,
    }
}

const PlayMusic = () => {
    const {
        search,
        setSearch,
        results,
        searchType,
        setSearchType,
        classes,
    } = usePlayMusic()
    const [sharePost, setSharePost] = useState(null)
    const [showSharePostModal, setShowSharePostModal] = useState(null)
    const [errorModal, setErrorModal] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const handleOpenshareModal = (album) => {
        setShowSharePostModal(true)
        setSharePost(album)
        setErrorModal(true)
    }

    const handleCloseModals = () => {
        setShowSharePostModal(false)
        setErrorModal(false)
    }

    const buildCard = (album) => {
        return (
            <Card className={classes.card} variant="outlined">
                <CardActionArea>
                    <CardContent>
                        <Grid container justify="space-between">
                            <div className={classes.titleHead}>
                                <span>{album.name}</span>
                            </div>
                        </Grid>
                    </CardContent>
                </CardActionArea>
                <iframe
                    id="playSong"
                    src={'https://open.spotify.com/embed?uri=' + album.uri}
                    title={album.id}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                />
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
            </Card>
        )
    }

    return (
        <div className="main">
            <div
                className="search"
                style={{ width: '100%', marginTop: 30, marginBottom: 10 }}
            >
                <Icon icon={faSearch} color="#444" />
                <input
                    className="search-input"
                    aria-labelledby="searchLabel"
                    placeholder="Search"
                    value={search}
                    style={{ width: '100%' }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="select-type-header">
                <div
                    className="select-type-header-component shadow"
                    style={searchType === 'track' ? { color: 'white' } : {}}
                    onClick={() => setSearchType('track')}
                >
                    Track
                </div>
                <div
                    className="select-type-header-component shadow"
                    style={searchType === 'artist' ? { color: 'white' } : {}}
                    onClick={() => setSearchType('artist')}
                >
                    Artist
                </div>
                <div
                    className="select-type-header-component shadow"
                    style={searchType === 'album' ? { color: 'white' } : {}}
                    onClick={() => setSearchType('album')}
                >
                    Album
                </div>
                <div
                    className="select-type-header-component shadow"
                    style={searchType === 'playlist' ? { color: 'white' } : {}}
                    onClick={() => setSearchType('playlist')}
                >
                    Playlist
                </div>
            </div>
            {results && results.length > 0 ? (
                <div className="main">
                    {results.map((song) => (
                        <Grid
                            container
                            className={classes.grid}
                            spacing={5}
                            key={song.id}
                        >
                            {buildCard(song)}
                        </Grid>
                    ))}
                </div>
            ) : (
                <div>
                    <Loading />
                    {/* <p> Currently no songs available </p> */}
                </div>
            )}
        </div>
    )
}

export default PlayMusic
