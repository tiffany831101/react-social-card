import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css/normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/styles.scss'
import post from './components/DataStructure'   // Dummy Data Structure
import CardHead from './components/CardHead'
import CardBody from './components/CardBody'
import CardStatus from './components/CardStatus'
import CardAction from './components/CardAction'
import CardComments from './components/CardComments'
import CardFoot from './components/CardFoot'
import uuid from 'uuid/v4'


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        currentUser: {
            userName: '測試人員',
            userID: uuid()
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
                userName: '路人甲',
                userID: uuid(),
                text: '我只是跟著鄉民進來湊熱鬧的⋯⋯請問時薪部分是不是列出一個範圍大家比較好參考？不然只寫面議有點⋯⋯'
            }, {
                userName: '賴美慧',
                userID: uuid(),
                text: '幫推'
            }, {
                userName: '大盤商',
                userID: uuid(),
                text: '亲，为什么给差评的呢亲？'
            }, {
                userName: '出乃玩',
                userID: uuid(),
                text: '樓上下去領五百！'
            }],
            shares: []
        }
    }
    handleLike = () => {
        this.setState(prevState => {
            return this.state.isLiked ? {
                // 切換 isLiked 狀態、從 likes 陣列移除最後一筆按讚的 object
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.status,
                    likes: [...prevState.status.likes].filter(
                        obj => (obj.userID !== this.state.currentUser.userID)
                    )
                }
            } : {
                // 切換 isLiked 狀態、新增按讚的 object 到 likes 陣列
                isLiked: !prevState.isLiked,
                status: {
                    ...prevState.status,
                    likes: [...prevState.status.likes, {
                        userName: this.state.currentUser.userName,
                        userID: this.state.currentUser.userID
                    }]
                }
            }
        })
    }
    render(props) {
        return (
            <div className="post-wrapper">
                <CardHead metaInfo={this.props.post.metaInfo} />
                <CardBody text={this.props.post.text} />
                <CardStatus post={this.state} />
                <CardAction
                    handleLike={this.handleLike}
                    isLiked={this.state.isLiked}
                />
                <CardComments comments={this.state.status.comments} />
                <CardFoot currentUser={this.state.currentUser} />
            </div>
        )
    }
}

ReactDOM.render(<SocialCard post={post} />, appRoot)
