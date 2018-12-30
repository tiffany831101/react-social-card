import React from 'react'

const CardBody = React.memo(({text, imageURL}) => (
    <div>
        <p className="post-content__text">{text}</p>
        {imageURL && (
            <div
                className="post-content__image"
                style={{
                    backgroundImage: `
                        url(${imageURL}),
                        url('/assets/images/image-not-found.png')
                    `
                }}
            />
        )}
    </div>
))

export default CardBody
