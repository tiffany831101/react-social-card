import React from 'react'

const CardHead = ({
    metaInfo: {authorName, authorID, publishedAt}
}) => (
    <div className="post-meta">
        <a className="post-meta__author-avatar" href="#">
            {authorName.slice(0, 1)}
        </a>
        <div className="post-meta__info">
            <span className="post-meta__author-name">
                <a href="#">{authorName}</a>
            </span>
            <a className="post-meta__timestamp" href="#">‎
                {publishedAt}
            </a>
        </div>
    </div>
)

export default CardHead
