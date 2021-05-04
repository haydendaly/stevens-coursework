import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { makeStyles, Button, Card, CardContent } from '@material-ui/core'

//For react-modal
ReactModal.setAppElement('#root')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        border: '1px solid #28547a',
        borderRadius: '4px',
    },
}

const useStyles = makeStyles({
    Button: {
        marginleft: '.5%',
        marginRight: '.5%',
    },

    labelStyle: {
        color: 'Red',
        width: '100%',
        size: '300',
    },

    root: {
        maxWidth: '50%',
        maxHeight: '50%',
    },
    media: {
        height: '50%',
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
})

/* The React Apollo package grants access to a Query component, which takes a query as prop and executes it when its rendered. 
That’s the important part: it executes the query when it is rendered. 
It uses React’s render props pattern, using a child as a function implementation where you can access the result of the query as an argument.
*/
function ShowErrorModal(props) {
    const [showErrorModal, setShowErrorModal] = useState(props.isOpen)
    const classes = useStyles()

    const handleCloseModal = () => {
        setShowErrorModal(null)
        props.handleClose()
    }

    return (
        <div>
            {/*Delete Employee Modal */}
            <ReactModal
                name="errorModal"
                isOpen={showErrorModal}
                contentLabel="Delete Image"
                style={customStyles}
            >
                <Card>
                    <CardContent>
                        <label className={classes.labelStyle}>
                            You need to login first before sharing.
                        </label>
                    </CardContent>
                </Card>

                <br />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="reset"
                    defaultValue="Reset"
                    onClick={handleCloseModal}
                >
                    Cancel
                </Button>
            </ReactModal>
        </div>
    )
}

export default ShowErrorModal
