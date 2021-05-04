import React, { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useWindowDimensions } from '../functions/dimensions'
import { Link } from 'react-router-dom'
import { SpotifyContext } from '../functions/Spotify'

const types = ['album', 'artist', 'playlist', 'track']

const useSidebarRight = () => {
    const { accessToken } = useContext(SpotifyContext)

    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [recommended, setRecommended] = useState([])
    const [open, setOpen] = useState(false)
    const { width } = useWindowDimensions()
    const [hasError, setHasError] = useState(null)
    const [searchType, setSearchType] = useState(null)

    // const url = 'http://localhost:3000/spotify-api/search?q=king%10gizzard&type=album&market=US'
    const baseUrl = `http://${window.location.hostname}:3000/spotify-api/search?q=`
    useEffect(() => {
        let url =
            `http://${window.location.hostname}:3000/spotify-api/me/top` +
            '?type=tracks&access_token=' +
            accessToken
        axios
            .get(url)
            .then(({ data }) => {
                if (data) {
                    setRecommended(data.items)
                }
            })
            .catch((err) => {
                console.log(err)
                setHasError(err)
            })
    }, [])

    useEffect(() => {
        const url =
            baseUrl +
            search
                .toLowerCase()
                .split(' ')
                .filter((word) => !types.includes(word))
                .join(' ') +
            '&type=track,album,playlist,artist&market=US&access_token=' +
            accessToken
        if (search === '') {
            setResults([])
            setSearchType('all')
        } else {
            axios
                .get(url)
                .then(({ data }) => {
                    if (search.toLowerCase().includes('album')) {
                        setResults(data.albums.items)
                        setSearchType('album')
                    } else if (search.toLowerCase().includes('artist')) {
                        setResults(data.artists.items)
                        setSearchType('artist')
                    } else if (search.toLowerCase().includes('playlist')) {
                        setResults(data.playlists.items)
                        setSearchType('playlist')
                    } else if (search.toLowerCase().includes('track')) {
                        setResults(data.tracks.items)
                        setSearchType('track')
                    } else {
                        let res = data.albums.items || []
                        res = res.concat(data.artists.items || [])
                        res = res.concat(data.playlists.items || [])
                        res = res.concat(data.tracks.items || [])
                        setResults(res)
                        setSearchType('all')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setHasError(err)
                })
        }
    }, [search])

    useEffect(() => {
        if (width >= 1400) {
            setOpen(false)
        }
    }, [width])

    return {
        search,
        setSearch,
        results,
        recommended,
        open,
        setOpen,
        width,
        searchType,
    }
}

const Holder = ({ link, name, images, artists }) => (
    <Link to={link} className="sidebar-song">
        <div className="sidebar-song-icon shadow">
            <img
                alt={`${name}`}
                src={
                    images.length > 0
                        ? images[0].url
                        : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/e7981d38-6ee3-496d-a6c0-8710745bdbfc/db6zlbs-68b8cd4f-bf6b-4d39-b9a7-7475cade812f.png'
                }
                style={{ width: '100%' }}
            />
        </div>
        <div className="sidebar-song-info">
            <p className="sidebar-song-title">
                {name.length > 23 ? name.slice(0, 23) + '...' : name}
            </p>
            <p className="sidebar-song-artist">
                {artists.length > 23 ? artists.slice(0, 23) + '...' : artists}
            </p>
        </div>
    </Link>
)

const Song = (props) => {
    const { data } = props
    if (data && data.type === 'album') {
        return (
            <Holder
                link={`/album/${data.id}`}
                name={data.name}
                images={data.images ? data.images : []}
                artists={
                    data.artists
                        ? data.artists.map((o) => o.name).join(', ')
                        : 'Artist'
                }
            />
        )
    } else if (data && data.type === 'track') {
        return (
            <Holder
                link={`/track/${data.id}`}
                name={data.name}
                images={
                    data.album && data.album.images && data.album.images !== 0
                        ? data.album.images
                        : []
                }
                artists={
                    data.artists
                        ? data.artists.map((o) => o.name).join(', ')
                        : 'Artist'
                }
            />
        )
    } else if (data && data.type === 'playlist') {
        return (
            <Holder
                link={`/playlist/${data.id}`}
                name={data.name}
                images={data.images ? data.images : []}
                artists={
                    data.owner && data.owner.display_name
                        ? data.owner.display_name
                        : 'Artist'
                }
            />
        )
    } else if (data && data.type === 'artist') {
        return (
            <Holder
                link={`/artist/${data.id}`}
                name={data.name}
                images={data.images ? data.images : []}
                artists={'Artist'}
            />
        )
    } else {
        return null
    }
}

const SideBarRight = () => {
    const {
        search,
        setSearch,
        results,
        recommended,
        open,
        setOpen,
        width,
        searchType,
        hasError,
    } = useSidebarRight()

    return (
        <div
            className="sidenav-right shadow"
            style={width > 1400 || open ? {} : { width: 55 }}
        >
            {width > 1400 || open ? (
                <div>
                    <div className="search">
                        <Icon
                            icon={faSearch}
                            color="#444"
                            onClick={() => setOpen(false)}
                        />

                        <input
                            id="seachInput"
                            className="search-input"
                            aria-labelledby="searchLabel"
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        {search !== '' && results && results.length > 0 ? (
                            <div className="search-results">
                                {results.map((song) => (
                                    <Song
                                        data={song}
                                        key={song.id}
                                        value={searchType}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="search-results">
                                <p className="recommended-header">
                                    Recommended For You:
                                </p>
                                {recommended && recommended.length > 0 ? (
                                    recommended.map((song) => (
                                        <Song
                                            data={song}
                                            key={song.id}
                                            value="tracks"
                                        />
                                    ))
                                ) : (
                                    <p className="recommended-no">
                                        {' '}
                                        This feature is only available to
                                        premium Spotify users.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div onClick={() => setOpen(true)}>
                    <Icon
                        icon={faSearch}
                        color="#fff"
                        style={{ marginLeft: 12 }}
                    />
                </div>
            )}
        </div>
    )
}

export default SideBarRight
