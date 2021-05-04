import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'

//For react-modal
ReactModal.setAppElement('#root')

const customStyles = {
    overlay: {
        backgroundColor: '#232323',
    },
    content: {
        textAlign: 'center',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        border: '0px solid #28547a',
        borderRadius: '30px',
        background: '#191919',
        // boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
}

const useStyles = makeStyles({
    Button: {
        marginleft: '.5%',
        marginRight: '.5%',
    },
    postButtonStyle: {
        marginleft: '.5%',
        marginRight: '.5%',
    },
    cancelButtonStyle: {
        marginleft: '.5%',
        marginRight: '.5%',
    },
    textFieldStyle: {
        fontSize: '20px',
        left: '.5%',
        right: '.5%',
        top: '.5%',
        bottom: '25%',
        width: '90%',
        margin: '5px',
        background: '515151',
        borderRadius: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
    },
    labelStyle: {
        color: 'white',
        width: '100%',
        size: 'bold',
        marginBottom: 10,
    },
    songFieldStyle: {
        width: '100%',
        height: '300px',
    },
    imageStyle: {
        width: '50%',
        height: '50%',
    },
    root: {
        color: 'white',
        background: '#191919',
        maxWidth: '100%',
        maxHeight: '50%',
    },
    media: {
        height: '50%',
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: 'red[500]',
    },
})

function AddPostModal(props) {
    const [showAddModal, setShowAddModal] = useState(props.isOpen)
    const classes = useStyles()
    const [postData, setPostData] = useState(null)

    const handleCloseAddModal = () => {
        setShowAddModal(true)
        props.handleClose()
    }

    /***
     * Get Post data from post textfield
     */
    const handleTextField = async (e) => {
        setPostData(e.target.value)
    }

    /***
     * If user logged in , then allow to add, edit or delete post
     * Else show message "You must log in to post"
     * Once posted , save post
     */
    const handleAddPost = async () => {
        if (props.currentUser) {
            try {
                await axios.post(
                    `http://${window.location.hostname}:3000/api/post`,
                    {
                        userId: props.currentUser, // pass valid userid here
                        text: postData,
                        songData: props.songData,
                        commentsArray: [],
                        likesArray: [],
                    }
                )
                handleCloseAddModal()
            } catch (e) {
                console.log(`ERROR IN ADD POST : ${e}`)
            }
        } else {
            alert('You must logged in to Post on SpotifyTwitter')
        }
    }

    const handleEditPost = async () => {
        try {
            await axios.patch(
                `http://${window.location.hostname}:3000/api/post/${props.postId}`,
                {
                    text: postData ? postData : props.data,
                }
            )
            handleCloseAddModal() // close modal
        } catch (e) {
            console.log(`ERROR IN EDIT POST : ${e}`)
        }
    }

    return (
        <div>
            <ReactModal
                name="addModal"
                isOpen={showAddModal}
                contentLabel="Add Modal"
                style={customStyles}
            >
                <label className={classes.labelStyle}>{props.title}</label>
                {props.songData ? (
                    <div className={classes.root}>
                        <iframe
                            id={props.songData.uri}
                            title={props.songData.uri}
                            src={
                                'https://open.spotify.com/embed?uri=' +
                                props.songData.uri
                            }
                            width="300"
                            height="380"
                            frameBorder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                        />
                        <textarea
                            className="share-textarea shadow"
                            id="txtPost"
                            type="text"
                            placeholder="Enter Post here...."
                            defaultValue={props.data}
                            rows="2"
                            onChange={handleTextField}
                            autoFocus="autoFocus"
                        />
                    </div>
                ) : (
                    <textarea
                        className="share-textarea shadow"
                        id="txtPost"
                        type="text"
                        placeholder="Enter Post here...."
                        defaultValue={props.data}
                        rows="4"
                        onChange={handleTextField}
                        autoFocus="autoFocus"
                    />
                )}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                        className="share-button shadow"
                        onClick={() => {
                            props.data ? handleEditPost() : handleAddPost()
                        }}
                    >
                        Post
                    </div>
                    <div
                        className="share-button shadow"
                        style={{ backgroundColor: '#222' }}
                        onClick={handleCloseAddModal}
                    >
                        Cancel
                    </div>
                </div>
            </ReactModal>
        </div>
    )
}

export default AddPostModal
