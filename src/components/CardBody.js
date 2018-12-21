import React from 'react'

const CardBody = ({post}) => (
    <div>
        <p className="post-content__text">{post.text}</p>
        <div
            className="post-content__image"
            style={{
                backgroundImage: `url(${post.imageURL})`
            }}
        />
    </div>
)

export default CardBody
