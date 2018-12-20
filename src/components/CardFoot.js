import React from 'react'

class CardFoot extends React.Component {
    state = {
        rows: 1
    }
    handleSubmitComment = (event) => {
        // 按 Eneter 送出訊息，按 Shift + Enter 換行
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            this.props.addComment(event.target.value.trim())
            event.target.value = ''
        }
    }
    adjustInputHeight = (event) => {
        event.target.style.height = '2.8rem' // 重置高度

        const heightPerLine = 15 * 1.15 // 行高
        const height = event.target.scrollHeight    // 高度
        const rows = Math.floor(height / heightPerLine) // 行數

        // 如果行數跟目前不一樣，再改變 state
        if (this.state.rows != rows) {
            this.setState(() => ({rows}))
        }
        event.target.style.height = 'auto'  // 配合 rows 調整高度
    }
    render(props) {
        const url = `/profile.php?id=${this.props.currentUser.id}`
        return (
            <div className="user-comment">
                <a className="user-comment__user-avatar" href={url}>
                    {this.props.currentUser.name.slice(0, 1)}
                </a>
                <textarea
                    rows={this.state.rows}
                    className="user-comment__input"
                    placeholder="回覆⋯⋯"
                    onKeyPress={this.handleSubmitComment}
                    onInput={this.adjustInputHeight}
                >
                </textarea>
            </div>
        )
    }
}

export default CardFoot
