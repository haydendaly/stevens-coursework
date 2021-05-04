import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { AuthContext } from '../firebase/Auth'

function UserProfile(props) {
    const { currentUser } = useContext(AuthContext)

    const [user, setUser] = useState(null)

    const [selectedFile, setSelectedFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setUser(null)

        const getUserData = async () => {
            try {
                const { data } = await axios.get(
                    `http://${window.location.hostname}:3000/api/user/${currentUser.uid}`
                )
                setUser(data)

                setImgUrl(
                    `http://${window.location.hostname}:3000/api/user/photo/${
                        currentUser.uid
                    }?${new Date().getTime()}`
                )
            } catch (e) {
                setError('Unable to retrive data from server')
                console.log(`error found : ${e}`)
            }
        }

        if (currentUser) {
            getUserData()
        }
    }, [currentUser])

    const submitForm = async (e) => {
        e.preventDefault()
        const {
            displayName,
            websiteUrl,
            country,
            facebook,
            instagram,
            twitter,
            biography,
        } = e.target.elements

        const name = displayName.value

        const isValidName =
            name && typeof name === 'string' && name.trim().length > 0

        if (!isValidName) {
            setError('Name is empty')
            return false
        }

        const updateData = {
            displayName: displayName.value,
            websiteUrl: websiteUrl.value,
            socialMedia: {
                facebook: facebook.value,
                instagram: instagram.value,
                twitter: twitter.value,
            },
            biography: biography.value,
            country: country.value,
        }

        try {
            const { data } = await axios.patch(
                `http://${window.location.hostname}:3000/api/user/${user._id}`,
                updateData
            )
            setUser(data)
            alert('Profile has been updated')
            window.location.replace('/profile')
        } catch (error) {
            console.log(error)
            alert(`Unable to update user: ${e}`)
        }
    }

    const fileSelectHandler = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const fileUploadHandler = async () => {
        try {
            let formData = new FormData()
            formData.append('image', selectedFile, selectedFile.name)
            const success = await axios.post(
                `http://${window.location.hostname}:3000/api/user/photo/${currentUser.uid}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            alert('Profile Picture Updated!')
            setImgUrl(
                `http://${window.location.hostname}:3000/api/user/photo/${
                    currentUser.uid
                }?${new Date().getTime()}`
            ) // force page re-render
        } catch (e) {
            console.log(e)
        }
    }

    let body = null

    if (user && props.page === 'ShowProfile') {
        body = (
            <div className="user-main">
                <div className="card mt-3">
                    <img
                        src={imgUrl}
                        alt="avatar"
                        className="card-img-top img-circle avatar"
                    ></img>
                    <div className="card-body">
                        <p className="card-title">{user.displayName}</p>

                        <p className="content">{user.email}</p>
                        {user.country ? (
                            <p className="content">{user.country}</p>
                        ) : null}
                        {user.biography ? (
                            <div>
                                <span className="info-tag">About</span>{' '}
                                <p className="content">{user.biography}</p>
                            </div>
                        ) : null}
                        {user.websiteUrl ? (
                            <div>
                                <span className="info-tag">
                                    Personal Website
                                </span>{' '}
                                <div className="webUrl">
                                    <a
                                        className="content"
                                        href={user.websiteUrl}
                                        aria-label="Personal Website"
                                    >
                                        {user.websiteUrl}
                                    </a>
                                </div>
                            </div>
                        ) : null}

                        <ul className="social-icons">
                            {user.socialMedia.facebook === '' ? null : (
                                <li key="facebook">
                                    <a
                                        href={user.socialMedia.facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Facebook Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Facebook.png"
                                            alt="facebook"
                                        />
                                    </a>
                                </li>
                            )}

                            {user.socialMedia.instagram === '' ? null : (
                                <li key="instagram">
                                    <a
                                        href={user.socialMedia.instagram}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Instagram Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Instagram.png"
                                            alt="instagram"
                                        />
                                    </a>
                                </li>
                            )}
                            {user.socialMedia.twitter === '' ? null : (
                                <li key="twitter">
                                    <a
                                        href={user.socialMedia.twitter}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Twitter Account"
                                    >
                                        <img
                                            src="/imgs/social_media_icon/Twitter.png"
                                            alt="twitter"
                                        />
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="webUrl">
                            <Link
                                className="content edit-button"
                                to="/profile/edit"
                                aria-label="Edit Profile"
                            >
                                <i className="fas fa-user-edit"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (user && props.page === 'EditProfile') {
        body = (
            <div>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col col-sm-4">
                            <div className="user-img">
                                <img
                                    src={imgUrl}
                                    alt="avatar"
                                    className="avatar img-circle avatar-lg"
                                    width="150px"
                                />
                            </div>
                            <div className="img-upload">
                                <label htmlFor="profile-photo" hidden>
                                    Photo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={fileSelectHandler}
                                    className="input-file"
                                    id="profile-photo"
                                />
                                <br />
                                <button
                                    className="btn btn-light"
                                    onClick={fileUploadHandler}
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className="col">
                            <div className="edit-profile">
                                {error && <p className="error">{error}</p>}
                                <form onSubmit={submitForm}>
                                    <div className="form-group">
                                        <label>
                                            Name
                                            <input
                                                className="form-control"
                                                name="displayName"
                                                id="displayName"
                                                type="text"
                                                defaultValue={user.displayName}
                                                required
                                            />
                                        </label>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Email
                                            <input
                                                className="form-control"
                                                name="email"
                                                id="email"
                                                type="text"
                                                readOnly
                                                value={user.email}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Personal Website
                                            <input
                                                className="form-control"
                                                name="websiteUrl"
                                                id="websiteUrl"
                                                type="url"
                                                defaultValue={user.websiteUrl}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Country
                                            <input
                                                className="form-control"
                                                name="country"
                                                id="country"
                                                type="text"
                                                defaultValue={user.country}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Facebook
                                            <input
                                                className="form-control"
                                                name="facebook"
                                                id="facebook"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.facebook
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Instagram
                                            <input
                                                className="form-control"
                                                name="instagram"
                                                id="instagram"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.instagram
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Twitter
                                            <input
                                                className="form-control"
                                                name="twitter"
                                                id="twitter"
                                                type="url"
                                                defaultValue={
                                                    user.socialMedia.twitter
                                                }
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            About
                                            <textarea
                                                className="form-control"
                                                name="biography"
                                                id="biography"
                                                type="text"
                                                rows="3"
                                                defaultValue={user.biography}
                                            />
                                        </label>
                                    </div>

                                    <button
                                        className="btn btn-light"
                                        type="submit"
                                    >
                                        Update Profile
                                    </button>
                                </form>
                                <br />
                                <Link to="/profile">Back To My Profile</Link>
                                <br />
                                <Link to="/profile/password">
                                    Change Password
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (user) {
        return <div className="main">{body}</div>
    } else if (currentUser && !user) {
        return <div className="main no-login">{error}</div>
    } else {
        return <div className="main no-login">Please Login</div>
    }
}

export default UserProfile
