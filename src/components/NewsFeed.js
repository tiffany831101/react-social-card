import React from 'react'
import uuid from 'uuid/v4'
import moment from 'moment'

import Loading from './Loading'
import CardInput from './CardInput'
import SocialCard from './SocialCard'


const serverURL = '//localhost:3000'

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
    sendRequest = async (url, method='GET', data=null) => {
        this.setState(() => ({isRequesting: true}))
        try {
            const requestOptions = {
                method,
                headers: {'Content-Type': 'application/json'}
            }
            const resp = !data ? 
                await fetch(url, requestOptions) :
                await fetch(url, {
                    ...requestOptions,
                    body: JSON.stringify(data)
                })
            if (!resp.ok) {throw new Error(`${resp.status} ${resp.statusText}`)}
            this.setState(() => ({isRequesting: false}))
            return await resp.json()
        } catch(err) {
            console.log(err)
            this.setState(() => ({
                loadingError: true,
                isRequesting: false
            }))
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
        this.sendRequest(`${serverURL}/posts`, 'POST', newPost)
    }
    handleDeletePost = async (id) => {
        try {
            // 更新狀態的貼文陣列
            this.setState(prevState => ({
                postsFromServer: prevState.postsFromServer.filter(
                    post => post.id !== id
                )
            }))
            // 上傳新的留言陣列
            const url = `${serverURL}/posts`
            const posts = await this.sendRequest(`${url}/${id}`, 'DELETE')

            // 伺服器連不到時會回傳 undefined
            if (!posts) {throw new Error('無法建立連線')}

        } catch(err) {
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({loadingError: true}))
        }
    }
    handleLikePost = async (id) => {
        const {postsFromServer, currentUserID, currentUserName} = this.state
        // 複製一個新的陣列再修改
        const updatedPosts = [...postsFromServer]
        const post = updatedPosts.find(post => post.id === id)
        const isLiked = post.likes.find(client => client.userID === currentUserID)
        post.likes = isLiked ?
            // 已按讚 -> 取消讚
            post.likes.filter(client => client.userID !== currentUserID) :
            // 未按讚 -> 已按讚
            [...post.likes, {userID: currentUserID, userName: currentUserName}]

        // 更新狀態
        this.setState(() => ({postsFromServer: updatedPosts}))

        // 上傳新的留言陣列
        this.sendRequest(
            `${serverURL}/posts/${id}`,
            'PATCH',
            {likes: post.likes}
        )
    }
    handleMorePosts = async () => {
        try {
            // 跟伺服器要資料
            const {postsFromServer} = this.state
            const url = `${serverURL}/posts`
            const [start, end] = [postsFromServer.length, postsFromServer.length + 15]
            const queryString = `_sort=publishedAt&_order=desc&_start=${start}&_end=${end}`
            const posts = await this.sendRequest(`${url}?${queryString}`)

            // 伺服器連不到時會回傳 undefined
            if (!posts) {throw new Error('無法建立連線')}

            // 狀態：讀取完畢、更新陣列
            this.setState(prevState => ({
                postsFromServer: [...prevState.postsFromServer, ...posts]
            }))
        } catch(err) {
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({loadingError: true}))
        }
    }
    handleAddComment = async (text, postID) => {
        const {currentUserID, currentUserName, postsFromServer} = this.state
        // 新增一則留言到複製的留言陣列裡面
        const newComment = {
            id: uuid(),
            text,
            authorID: currentUserID,
            authorName: currentUserName,
            publishedAt: moment().unix(),
            likes: []
        }
        const updatedPosts = [...postsFromServer]
        const post = updatedPosts.find(post => post.id === postID)
        if (post) {post.comments.push(newComment)}

        // 更新狀態
        this.setState(() => ({postsFromServer: updatedPosts}))

        // 上傳新的留言陣列
        this.sendRequest(
            `${serverURL}/posts/${postID}`,
            'PATCH',
            {comments: post.comments}
        )
    }
    handleDeleteComment = async (commentID, postID) => {
        // 把留言從複製的留言陣列裡面移除
        const updatedPosts = [...this.state.postsFromServer]
        const post = updatedPosts.find(post => post.id === postID)
        if (post) {
            post.comments = post.comments.filter(
                comment => comment.id !== commentID
            )
        }
        // 更新狀態
        this.setState(() => ({postsFromServer: updatedPosts}))

        // 上傳新的留言陣列
        this.sendRequest(
            `${serverURL}/posts/${postID}`,
            'PATCH',
            {comments: post.comments}
        )
    }
    handleLikeComment = async (commentID, postID) => {
        const {postsFromServer, currentUserID, currentUserName} = this.state
        // 複製一個新的陣列再修改
        const updatedPosts = [...postsFromServer]
        const post = updatedPosts.find(post => post.id === postID)
        const comment = post.comments.find(comment => comment.id === commentID)
        const isLiked = comment.likes.find(client => client.userID === currentUserID)
        comment.likes = isLiked ?
            // 已按讚 -> 取消讚
            comment.likes.filter(client => client.userID !== currentUserID) :
            // 未按讚 -> 已按讚
            [...comment.likes, {userID: currentUserID, userName: currentUserName}]

        // 更新狀態
        this.setState(() => ({postsFromServer: updatedPosts}))

        // 上傳新的留言陣列
        this.sendRequest(
            `${serverURL}/posts/${postID}`,
            'PATCH',
            {comments: post.comments}
        )
    }
    async componentDidMount() {
        // 狀態 -> 讀取中
        this.setState(() => ({isLoading: true}))

        // 第一次渲染時從伺服器拿資料
        try {
            // 伺服器先「由新到舊」排序文章，之後再回傳最前面 15 筆
            const url = `${serverURL}/posts`
            const queryString = '_sort=publishedAt&_order=desc&_start=0&_end=15'
            const posts = await this.sendRequest(`${url}?${queryString}`)

            // 伺服器連不到時會回傳 undefined
            if (!posts) {throw new Error('無法建立連線')}

            // 狀態 -> 讀取完畢、無錯誤、更新貼文
            this.setState(() => ({
                isLoading: false,
                postsFromServer: posts
            }))
        } catch(err) {
            console.log(err)
            // 狀態 -> 發生錯誤
            this.setState(() => ({loadingError: true, isLoading: false}))
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
                            return (
                                <SocialCard
                                    key={post.id}
                                    currentUserID={this.state.currentUserID}
                                    currentUserName={this.state.currentUserName}
                                    post={post}
                                    sendRequest={this.sendRequest}
                                    handleLikePost={this.handleLikePost}
                                    handleDeletePost={this.handleDeletePost}
                                    handleAddComment={this.handleAddComment}
                                    handleDeleteComment={this.handleDeleteComment}
                                    handleLikeComment={this.handleLikeComment}
                                />
                            )
                        })}
                        <div
                            style={{textAlign: 'center', color: '#4868ad'}}
                            onClick={this.handleMorePosts}
                        >
                            {this.state.isRequesting ? <p>載入中</p> : (<p>載入更多貼文</p>)}
                        </div>
                    </div>
                </React.Fragment>
            )   // End of return()
        }   // End of else
    }   // End of render()
}

export default NewsFeed
