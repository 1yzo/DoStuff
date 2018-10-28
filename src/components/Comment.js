const Comment = ({ text, date }) => {
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    commentEl.innerHTML = text;
    
    return commentEl;
};

export default Comment;