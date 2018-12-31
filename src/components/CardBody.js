import React from 'react'

const CardBody = React.memo(({postText, postImageURL}) => (
    <div>
        <p className="post-content__text">{postText}</p>
        {postImageURL && (
            <div
                className="post-content__image"
                style={{
                    backgroundImage: `
                        url(${postImageURL}),
                        url('/assets/images/image-not-found.png')
                    `
                }}
            />
        )}
    </div>
))

export default CardBody
