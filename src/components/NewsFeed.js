import React from 'react'
import uuid from 'uuid/v4'
import moment from 'moment'

import Loading from './Loading'
import CardInput from './CardInput'
import SocialCard from './SocialCard'


class NewsFeed extends React.Component {
    state = {
        // 頁面狀態
        isLoading: null,
        isRequesting: null,
        loadingError: null,
        // 使用者狀態
        currentUserID: 'b763ae61-6891-46cc-a049-c1c6a8871d96',
        currentUserName: '測試員',
        attemptingToType: false,
        // 儲存的貼文
        postsFromServer: []
    }
    sendRequest = async (url, method=null, data=null) => {
        try {
            const resp = (!method && !data) ? await fetch(url) :
                await fetch(url, {
                    method,
                    body: JSON.stringify(data),
                    headers:{'Content-Type': 'application/json'}
                })
            if (!resp.ok) {throw new Error(`${resp.status} ${resp.statusText}`)}
            return await resp.json()
        } catch(err) {
            console.log(err)
            this.setState(() => ({isLoading: false, loadingError: true}))
            return err
        }
    }
    handleAddPost = async (text) => {
        // 新增一則貼文到複製的貼文陣列裡面
        const {currentUserName, currentUserID} = this.state
        const newPost = {
            id: uuid(),
            authorName: currentUserName,
            authorID: currentUserID,
            publishedAt: moment().unix(),
            text,
            imageURL: '',
            likes: [],
            comments: [],
            shares: []
        }
        // 更新狀態
        this.setState(prevState => ({
            postsFromServer: [newPost, ...prevState.postsFromServer]
        }))

        // 上傳新的留言陣列
        this.sendRequest('//localhost:3000/posts', 'POST', newPost)
    }
    handleMorePosts = async () => {
        // 狀態 -> 下載資料中
        this.setState(() => ({isRequesting: true}))

        try {
            // 跟伺服器要資料
            const {postsFromServer} = this.state
            const url = '//localhost:3000/posts'
            const [start, end] = [postsFromServer.length, postsFromServer.length + 20]
            const queryString = `_sort=publishedAt&_order=desc&_start=${start}&_end=${end}`
            const posts = await this.sendRequest(`${url}?${queryString}`)

            // 狀態：讀取完畢、更新陣列
            this.setState(prevState => ({
                isRequesting: false,
                loadingError: false,
                postsFromServer: [...prevState.postsFromServer, ...posts]
            }))
        } catch(err) {
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({isRequesting: false, loadingError: true}))
        }
    }
    async componentDidMount() {
        // 狀態 -> 讀取中
        this.setState(() => ({isLoading: true}))
        try {
            // 第一次渲染時從伺服器拿資料
            const url = '//localhost:3000/posts'
            // 伺服器先「由新到舊」排序文章，之後再回傳最前面 20 筆
            const queryString = '_sort=publishedAt&_order=desc&_start=0&_end=20'
            const posts = await this.sendRequest(`${url}?${queryString}`)
            // 狀態 -> 讀取完畢、無錯誤、更新貼文
            this.setState(() => ({
                isLoading: false,
                loadingError: false,
                postsFromServer: posts
            }))
        } catch(err) {
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({isLoading: false, loadingError: true}))
        }
    }
    render() {
        if (this.state.isLoading) {
            // 顯示讀取中頁面
            return <Loading />
        } else if (this.state.loadingError || this.state.postsFromServer.length == 0) {
            // 顯示錯誤頁面
            return <h1 className="status-icon-container">Error</h1>
        } else if (this.state.postsFromServer.length > 0) {
            return (
                <React.Fragment>
                    <div>
                        <CardInput
                            inputType='post'
                            currentUserName={this.state.currentUserName}
                            currentUserID={this.state.currentUserID}
                            handleUserSubmit={this.handleAddPost}
                            attemptingToType={this.state.attemptingToType}
                            startTyping={() => {
                                this.setState(() => ({attemptingToType: true}))
                            }}
                            quitTyping={() => {
                                this.setState(() => ({attemptingToType: false}))
                            }}
                        />
                    </div>
                    <div>
                        {this.state.postsFromServer.map((post, index) => {
                            // 確認貼文有沒有被使用者按過讚
                            const isLiked = post.likes.find(
                                client => client.userID === this.state.currentUserID
                            ) ? true : false

                            // 調整資料格式
                            const restructuredPost = {
                                postID: post.id,
                                postIsLiked: isLiked,
                                postAuthorName: post.authorName,
                                postAuthorID: post.authorID,
                                postPublishedAt: post.publishedAt,
                                postText: post.text,
                                postImageURL: post.imageURL,
                                postLikes: post.likes,
                                postComments: post.comments,
                                postShares: post.shares
                            }
                            return (
                                <SocialCard
                                    key={post.id}
                                    currentUserID={this.state.currentUserID}
                                    currentUserName={this.state.currentUserName}
                                    post={restructuredPost}
                                    sendRequest={this.sendRequest}
                                />
                            )
                        })}
                        <p
                            style={{textAlign: 'center', color: '#4868ad'}}
                            onClick={this.handleMorePosts}
                        >
                            {this.state.isRequesting ? '讀取中' : '點我載入更多貼文'}
                        </p>
                    </div>
                </React.Fragment>
            )   // End of return()
        }   // End of else
    }   // End of render()
}

export default NewsFeed
