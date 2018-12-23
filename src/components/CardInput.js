import React from 'react'

class CardInput extends React.Component {
    state = {
        rows: 1,
        inputValue: ''
    }
    textArea = React.createRef()

    handleInputChange = (event) => {
        const value = event.target.value
        this.setState(() => ({inputValue: value}))
    }
    handleSubmitComment = (event) => {
        // 按 Eneter 送出訊息，按 Shift + Enter 換行
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()  // 只按 Enter 時不換行
            const textInput = this.state.inputValue.trim()

            // 有輸入內容才送出留言，沒內容的話不會有反應
            if (textInput) {
                this.props.addComment(textInput)
                this.setState(() => ({inputValue: ''})) // 清空文字
                if (this.state.rows > 1) {
                    this.setState(() => ({rows: 1}))    // 重置高度
                }
            }
        }
    }
    adjustInputHeight = (event) => {
        this.textArea.current.style.height = '2.8rem' // 重置高度

        const heightPerLine = 15 * 1.15 // 行高
        const height = this.textArea.current.scrollHeight    // 高度
        const rows = Math.floor(height / heightPerLine) // 行數

        // 如果行數跟目前不一樣，再改變 state
        if (this.state.rows != rows) {
            this.setState(() => ({rows}))
        }
        this.textArea.current.style.height = 'auto'  // 配合 rows 調整高度
    }
    componentDidUpdate(prevProps, prevState) {
        // 如果使用者點留言的 <div>，就滑到 <textarea> 開始閃爍游標
        if (this.props.attemptingToType !== prevProps.attemptingToType &&
            this.props.attemptingToType) {
            this.textArea.current.focus()
        }
        // 送出留言後畫面自動保持在最底部
        if (!this.state.inputValue && prevState.inputValue) {
            this.textArea.current.scrollIntoView()
        }
    }
    render() {
        return (
            <div className="user-comment">
                <a className="user-comment__user-avatar" href="#">
                    {this.props.currentUser.name.slice(0, 1)}
                </a>
                <textarea
                    className="user-comment__input"
                    ref={this.textArea}
                    rows={this.state.rows}
                    placeholder="回覆⋯⋯"
                    onKeyPress={this.handleSubmitComment}
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onInput={this.adjustInputHeight}
                    onFocus={this.props.startTyping}
                    onBlur={this.props.quitTyping}
                />
            </div>
        )
    }
}

export default CardInput
