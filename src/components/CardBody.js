import React from 'react'

const CardBody = ({post}) => (
    <div>
        <p className="post-content__text">{post.text}</p>
        {post.imageURL && (
            <div
                className="post-content__image"
                style={{
                    backgroundImage: `
                        url(${post.imageURL}),
                        url('/assets/images/image-not-found.png')
                    `
                }}
            />
        )}
    </div>
)

export default CardBody
