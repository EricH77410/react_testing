import React from 'react'

class CommentBox extends React.Component {
  state = { comment: '' }

  changeTxt = (e) => {
    this.setState({comment: e.target.value})
  }

  submitForm = (e) => {
    e.preventDefault();
    // TODO
    // call a action creator and save comment
    
    //reset
    this.setState({comment:''})
  }

  render(){
    return (
      <form onSubmit={this.submitForm}>
        <h4>Add a Comment</h4>
        <textarea value={this.state.comment} onChange={this.changeTxt}/>
        <div>
          <button>Send Comment</button>
        </div>
      </form>
    )
  }
}

export default CommentBox