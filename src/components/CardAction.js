import React from 'react'

const CardAction = (props) => (
    <div className="post-action">
        <div
            className={
                props.isLiked ?
                "post-action__like post-action__like--liked" :
                "post-action__like"
            }
            onClick={props.handleLikePost}
        >
            <i className="far fa-thumbs-up" />
            <span>讚</span>
        </div>
        <div
            className="post-action__comment"
            onClick={props.startTyping}
        >
            <i className="far fa-comment-alt" />
            <span>留言</span>
        </div>
        <div className="post-action__share">
            <i className="far fa-share-square" />
            <span>分享</span>
        </div>
    </div>
)

export default CardAction
