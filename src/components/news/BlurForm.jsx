import React from 'react';
import CommentForm from './Comment-Form';

function BlurForm({ postID }) {
    return (
        <div className="glass-morphism-container">
            <div className="glass-morphism-content">
                <CommentForm postID={postID} />
            </div>
            <button className="login-button">Login</button>
        </div>
    );
}

export default BlurForm;