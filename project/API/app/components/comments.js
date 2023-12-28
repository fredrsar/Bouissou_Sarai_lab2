// CommentSection.js
import React, { useState } from "react";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '../components/UserContext';

const CommentSection = ({ comments, postId }) => {
  const supabase = useSupabaseClient();
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is authenticated
    if (!user) {
      console.error("User is not authenticated. Comment not submitted.");
      return;
    }

    try {
        console.log("user name: ",user.name);
      // Add a new comment to the database
      const { data, error } = await supabase.from("comments").upsert([
        {
          post_id: postId,
          user_id: user.id,
          content: newComment,
          user_name: user.user_metadata.name, // Assuming you have the user's name in the user context
        },
      ]);

      if (error) {
        console.error("Error adding comment:", error.message);
      } else {
        // Update the local state with the new comment
        setNewComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.user_name}</strong>: {comment.content}
          </li>
        ))}
      </ul>
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
