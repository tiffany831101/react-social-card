import React from 'react'

const whoLikesIt = (arr, meIncluded=false) => {
    switch (arr.length) {
        case 0:
            return ''
        case 1:
            return meIncluded ?
                '你覺得這真讚' : `${arr[0].userName}覺得讚`
        case 2:
            return meIncluded ?
                `你和${arr[0].userName}都說讚` :
                `${arr[0].userName}和${arr[1].userName}都說讚`
        case 3:
            return meIncluded ?
                `你、${arr[0].userName}和${arr[1].userName}都說讚` :
                `${arr[0].userName}、${arr[1].userName}和${arr[2].userName}都說讚`
        default:
            return meIncluded ?
                `你、${arr[0].userName}和其他${arr.length-2}人都說讚` :
                `${arr[0].userName}、${arr[1].userName}和其他${arr.length-2}人都說讚`
    }
}

const CardStatus = ({isLiked, likes, commentCount, shareCount}) => (
    <div>
        {(likes.length + commentCount + shareCount > 0) && (
            <div className="post-status">
                <p className={
                    (likes.length > 0) ?
                    'post-status__like-count' :
                    'post-status__like-count post-status__like-count--hidden'
                }>
                    <i className="fab fa-gratipay" style={{color: '#4c82f7'}} />
                    <span className="post-status__like-count-text">{likes.length}</span>
                    <span
                        className="post-status__like-count post-status__like-count--expanded"
                    >
                        {isLiked ? whoLikesIt(likes, true) : whoLikesIt(likes)}
                    </span>
                </p>
                {(commentCount > 0) && (
                    <p className="post-status__comment-count">
                        <span>{`${commentCount}則留言`}</span>
                    </p>
                )}
                {(shareCount > 0) && (
                    <p className="post-status__share-count">
                        <span>{`${shareCount}次分享`}</span>
                    </p>
                )}
            </div>
        )}
    </div>
)

export default CardStatus
