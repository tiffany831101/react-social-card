import React from 'react'

const CardHead = ({
    metaInfo: {authorName, authorID, publishedAt}
}) => {
    const url = `/profile.php?id=${authorID}`
    return (
    <div className="post-meta">
        <a className="post-meta__author-avatar" href={url}>
            {authorName.slice(0, 1)}
        </a>
        <div className="post-meta__info">
            <span className="post-meta__author-name">
                <a href={url}>{authorName}</a>
            </span>
            <a className="post-meta__timestamp" href="#">‎
                {publishedAt}
            </a>
        </div>
    </div>
)}

export default CardHead
