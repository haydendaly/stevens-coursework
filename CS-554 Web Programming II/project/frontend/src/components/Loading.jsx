import React from 'react'
import Spinner from 'react-spinkit'

const Loading = () => {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <Spinner
                name="double-bounce"
                color="#eee"
                style={{ height: 75, width: 75 }}
            />
        </div>
    )
}

export default Loading
