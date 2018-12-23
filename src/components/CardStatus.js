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

const CardStatus = (props) => {
    const {isLiked, status: {likes, comments, shares}} = props.post

    return (
    <div className="post-status">
        <p>{isLiked}</p>
        {(likes.length > 0) && (
            <p>
                <i className="fab fa-gratipay" style={{color: '#4c82f7'}} />
                <span className="post-staus__people-who-like">
                    {isLiked ? whoLikesIt(likes, true) : whoLikesIt(likes)}
                </span>
            </p>
        )}
    </div>
)}

export default CardStatus