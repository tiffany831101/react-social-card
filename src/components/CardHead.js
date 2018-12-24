import React from 'react'
import moment from 'moment'
import 'moment/locale/zh-tw'
moment.locale('zh-tw')

const CardHead = ({authorName, authorID, publishedAt}) => (
    <div className="post-meta">
        <a className="post-meta__author-avatar" href="#">
            {authorName.slice(0, 1).toUpperCase()}
        </a>
        <div className="post-meta__info">
            <span className="post-meta__author-name">
                <a href="#">{authorName}</a>
            </span>
            <a
                className="post-meta__timestamp"
                href="#"
                title={moment.unix(publishedAt).format('LLL')}
            >‎
                {moment.unix(publishedAt).format('MMMDo')}
            </a>
        </div>
    </div>
)

export default CardHead
