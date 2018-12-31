import React from 'react'

const LoadingError = React.memo((props) => (
    <div className="status-icon-container">
        <h2 style={{color: '#62676f', fontSize: '3.0rem'}}>
            {props.errMsg}
        </h2>
    </div>
))

export default LoadingError
