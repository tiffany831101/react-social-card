import React from 'react'



class CardFoot extends React.Component {
    state = {
        inputHeight: '34px'
    }
    handleSubmitComment = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value.trim())
        }
    }
    adjustInputHeight = (event) => {
        const height = event.target.scrollHeight
        this.setState(prevState => ({
            inputHeight: `${height}px`
        }))
    }
    render(props) {
        return (
            <div className="user-comment">
                <a className="user-comment__user-avatar" href="#">A</a>
                <textarea
                    style={{height: this.state.inputHeight}}
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
