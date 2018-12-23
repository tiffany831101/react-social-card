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
import CardInput from './components/CardInput'

import moment from 'moment'
import uuid from 'uuid/v4'
import connectTo from './functions/connect'
import createFakeLikers from './functions/createLikers'


const appRoot = document.getElementById('app')

class SocialCard extends React.Component {
    state = {
        post: {
            metaInfo: {
                authorName: '',
                authorID: '',
                publishedAt: ''
            },
            text: '',
            imageURL: ''
        },
        currentUser: {
            name: '鄉の民',
            id: uuid()
        },
        attemptingToType: false,
        isLiked: false,
        status: {
            likes: createFakeLikers(26, false),
            comments: [{
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:22').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '情',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:22').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '嘴砲',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:22').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '毛衣發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:22').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '可惡沒搶到',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:23').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:23').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '皮卡丘發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:23').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '用踩的效率那麼差又不穩定 浪費錢買設備',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:23').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '兩兆燒完了 還是沒電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:24').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '台灣本來贏南韓，可是反核後，投資萎縮，慢慢被南韓超越，2000年反核後成為高跳電國家，投資轉往不會跳電的國家，南韓於2004超越台灣',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:25').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:27').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '再次展現台灣花一大把錢浪費時間，結果什麼也沒做回原點',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:28').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '先把高耗能產業趕出台灣 就可免吵缺電 用什麼發電好一陣子了',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:28').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '謙卑發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:30').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '核電、風力、太陽能',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:31').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '+ OK',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:31').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '人力',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:22').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '情',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:32').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '肥宅燃燒火力發電 順便清一些垃圾解決人口過多的問題',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:33').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '離岸風電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:35').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '插鼻孔阿！',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:36').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:36').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '惜',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:36').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '天然氣 可是台灣有人會喊好貴喔 企業不想辦法節能 只想用便宜的電 新加坡有用核能嗎？人家的經濟有變差嗎？政黨和企業把人民唬得團團轉 讓國際看笑話',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:36').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '環團發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:37').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '用愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:40').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '核能吧才幾台就能撐10%還舊式的',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:41').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '母豬超多 建議用綠帽發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:41').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '全部都插滿核能啦',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:45').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '帶頭反核四真的是罪人',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:46').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: 'https://goo.gl/E1p7bE  新加坡發電廠列表 燃油 燃氣 燃垃圾',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:49').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '空汙發電，這才創新',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:51').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '核能會爆炸死半個台灣的 跟你講再多也沒用',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:58').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '疆屍發電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:59').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '高耗能產業趕出台灣，例如半導體？',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 11:59').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '先把白癡趕出去啦',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:02').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '豈止半導體 石化 金屬工業等也順便趕出去',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:03').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:06').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:08').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '地熱  但是要解決 流磺侵蝕機器問題',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:11').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '台灣價值',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:11').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:06').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛啊 到底要問幾次',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 12:19').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '不是適合甚麼發電 而是台灣根本不適合能源密集的產業 不過台灣高科技產值高 根本取代不了 慘 產業不轉型 永遠不夠電',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 13:07').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: 'love',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 13:23').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
            }, {
                id: uuid(),
                text: '愛',
                authorName: (Math.random() + 1).toString(36).slice(Math.floor((Math.random() * 8) + 2)),
                authorID: uuid(),
                publishedAt: moment('2018-12-22 13:44').unix(),
                isLiked: false,
                likes: createFakeLikers(Math.floor(Math.random() * 7))
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
                    obj => obj.userID !== this.state.currentUser.id
                )
            } else {
                // 增加目前使用者進到likes
                targetComment.likes.push({
                    userName: this.state.currentUser.name,
                    userID: this.state.currentUser.id
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
                    publishedAt: moment().unix(),
                    isLiked: false,
                    likes: []
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
    componentDidMount() {
        // 從 json-server 抓資料回來
        connectTo(`//localhost:3000/post`)
            .then(data => this.setState({post: data}))
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div className="post-wrapper">
                <CardHead metaInfo={this.state.post.metaInfo} />
                <CardBody post={this.state.post} />
                <CardStatus post={this.state} />
                <CardAction
                    handleLikePost={this.handleLikePost}
                    isLiked={this.state.isLiked}
                    attemptingToType={this.state.attemptingToType}
                    startTyping={() => {
                        this.setState(prevState => ({attemptingToType: true}))
                    }}
                />
                <CardComments
                    comments={this.state.status.comments}
                    currentUser={this.state.currentUser}
                    deleteComment={this.deleteComment}
                    handleLikeComment={this.handleLikeComment}
                />
                <CardInput
                    currentUser={this.state.currentUser}
                    addComment={this.addComment}
                    attemptingToType={this.state.attemptingToType}
                    startTyping={() => {
                        this.setState(prevState => ({attemptingToType: true}))
                    }}
                    quitTyping={() => {
                        this.setState(prevState => ({attemptingToType: false}))
                    }}
                />
            </div>
        )
    }
}

ReactDOM.render(<SocialCard />, appRoot)
