import React from 'react'
import Loading from './Loading'
import SocialCard from './SocialCard'


class NewsFeed extends React.Component {
    state = {
        // 頁面狀態
        isLoading: null,
        loadingError: null,
        // 使用者狀態
        currentUserID: 'b763ae61-6891-46cc-a049-c1c6a8871d96',
        currentUserName: '測試員',
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
    async componentDidMount() {
        // 狀態 -> 讀取中
        this.setState(() => ({isLoading: true}))
        try {
            // 第一次渲染時從伺服器拿資料
            const requestResult = await this.sendRequest('//localhost:3000/posts')
            const posts = [...requestResult].sort((a, b) => (
                b.publishedAt - a.publishedAt   // 文章順序：新 -> 舊
            ))
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
            return err
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
                                firstPost={(index == 0)}
                                key={post.id}
                                currentUserID={this.state.currentUserID}
                                currentUserName={this.state.currentUserName}
                                post={restructuredPost}
                            />
                        )
                    })}
                </div>
            )   // End of return()
        }   // End of else
    }   // End of render()
}

export default NewsFeed
