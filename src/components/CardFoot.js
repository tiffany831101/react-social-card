import React from 'react'

class CardFoot extends React.Component {
    state = {
        rows: 1
    }
    handleSubmitComment = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value.trim())
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
                <a className="user-comment__user-avatar" href="#">A</a>
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
