import React from 'react'

class CardFoot extends React.Component {
    state = {
        rows: 1
    }
    handleSubmitComment = (event) => {
        // 按 Eneter 送出訊息，按 Shift + Enter 換行
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()  // 只按 Enter 時不換行
            const textInput = event.target.value.trim()
            if (textInput) {
                this.props.addComment(textInput)
                event.target.value = ''
                // 重置 textarea 高度
                if (this.state.rows > 1) {
                    this.setState(() => ({rows: 1}))
                }
            }
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
        return (
            <div className="user-comment">
                <a className="user-comment__user-avatar" href="#">
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
