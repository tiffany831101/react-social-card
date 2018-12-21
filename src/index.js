import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'

import CardHead from './components/CardHead'
import CardBody from './components/CardBody'
import CardStatus from './components/CardStatus'
import CardAction from './components/CardAction'
import CardComments from './components/CardComments'
import CardFoot from './components/CardFoot'
import moment from 'moment'
import post from './components/DataStructure'   // Dummy Data
import uuid from 'uuid/v4'


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        currentUser: {
            name: '測試人員',
            id: uuid()
        },
        isLiked: false,
        status: {
            likes: [{
                userName: '費歐娜',
                userID: uuid()
            }, {
                userName: '連公子',
                userID: uuid()
            }, {
                userName: '伍佰',
                userID: uuid() 
            }, {
                userName: '易受傷',
                userID: uuid()
            }],
            comments: [{
                id: uuid(),
                text: '我只是跟著鄉民進來湊熱鬧的⋯⋯請問時薪部分是不是列出一個範圍大家比較好參考？不然只寫面議有點⋯⋯',
                authorName: '路人甲',
                authorID: uuid(),
                publishedAt: moment('2018-12-17 13:20').unix(),
                isLiked: false,
                likes: [{
                    userName: '甲同學',
                    userID: uuid()
                }, {
                    userName: '乙同學',
                    userID: uuid()
                }, {
                    userName: '丙同學',
                    userID: uuid()
                }, {
                    userName: '丁同學',
                    userID: uuid()
                }]
            }, {
                id: uuid(),
                text: '亲，为什么给差评的呢亲？',
                authorName: '大盤商',
                authorID: uuid(),
                publishedAt: moment('2018-12-18 08:13').unix(),
                isLiked: false,
                likes: []
            }, {
                id: uuid(),
                text: '樓上下去領五百！',
                authorName: '出乃玩',
                authorID: uuid(),
                publishedAt: moment('2018-12-20 16:33').unix(),
                isLiked: false,
                likes: [{
                    userName: '戊同學',
                    userID: uuid()
                }, {
                    userName: '己同學',
                    userID: uuid()
                }]
            }, {
                id: uuid(),
                text: '我的原則很簡單 有貓就給讚',
                authorName: '狂讚士',
                authorID: uuid(),
                publishedAt: moment('2018-12-21 14:17').unix(),
                isLiked: false,
                likes: [{
                    userName: '庚同學',
                    userID: uuid()
                }, {
                    userName: '辛同學',
                    userID: uuid()
                }, {
                    userName: 'A同學',
                    userID: uuid()
                }, {
                    userName: 'B同學',
                    userID: uuid()
                }, {
                    userName: 'C同學',
                    userID: uuid()
                }, {
                    userName: 'D同學',
                    userID: uuid()
                }, {
                    userName: 'E同學',
                    userID: uuid()
                }, {
                    userName: 'F同學',
                    userID: uuid()
                }]
            }, {
                id: uuid(),
                text: '早安您好、平安喜樂，認同請分享。。。',
                authorName: '賴美慧',
                authorID: uuid(),
                publishedAt: moment('2018-12-21 17:08').unix(),
                isLiked: false,
                likes: [{
                    userName: '掌蓓文',
                    userID: uuid()
                }]
            }],
            shares: []
        }
    }
    handleLikePost = () => {
        this.setState(prevState => {
            return this.state.isLiked ? {
                // 切換 isLiked 狀態、從 likes 陣列移除最後一筆按讚的 object
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.status,
                    likes: [...prevState.status.likes].filter(
                        obj => (obj.userID !== this.state.currentUser.id)
                    )
                }
            } : {
                // 切換 isLiked 狀態、新增按讚的 object 到 likes 陣列
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.status,
                    likes: [...prevState.status.likes, {
                        userName: this.state.currentUser.name,
                        userID: this.state.currentUser.id
                    }]
                }
            }
        })
    }
    handleLikeComment = (commentID) => {
        this.setState(prevState => {
            const newComments = [...prevState.status.comments]
            const targetComment = newComments.find(obj => obj.id === commentID)
            if (targetComment.isLiked) {
                // 把目前使用者從按讚的人裡面移除
                targetComment.likes = targetComment.likes.filter(
                    obj => obj.userID !== prevState.currentUser.id
                )
            } else {
                // 增加目前使用者進到likes
                targetComment.likes.push({
                    userName: prevState.currentUser.name,
                    userID: prevState.currentUser.id
                })
            }
            targetComment.isLiked = !targetComment.isLiked

            return {
                status: {
                    ...prevState.status,
                    comments: newComments
                }
            }
        })
    }
    addComment = (textInput) => {
        this.setState(prevState => ({
            status: {
                ...prevState.status,
                comments: [...prevState.status.comments, {
                    id: uuid(),
                    text: textInput,
                    authorName: this.state.currentUser.name,
                    authorID: this.state.currentUser.id,
                    publishedAt: moment().unix()
                }]
            }
        }))
    }
    deleteComment = (id) => {
        this.setState(prevState => ({
            status: {
                ...prevState.status,
                comments: [...prevState.status.comments].filter(
                    comment => (comment.id !== id)
                )
            }
        }))
    }
    render() {
        return (
            <div className="post-wrapper">
                <CardHead metaInfo={this.props.post.metaInfo} />
                <CardBody post={this.props.post} />
                <CardStatus post={this.state} />
                <CardAction
                    handleLikePost={this.handleLikePost}
                    isLiked={this.state.isLiked}
                />
                <CardComments
                    comments={this.state.status.comments}
                    currentUser={this.state.currentUser}
                    deleteComment={this.deleteComment}
                    handleLikeComment={this.handleLikeComment}
                />
                <CardFoot
                    currentUser={this.state.currentUser}
                    addComment={this.addComment}
                />
            </div>
        )
    }
}

ReactDOM.render(<SocialCard post={post} />, appRoot)
