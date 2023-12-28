// PostDetailPage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import PostDetail from "../../components/articleDetails";
import CommentSection from "../../components/comments"; 
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const PostDetailPage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { articleID } = router.query;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id_article", articleID)
          .single();

        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("post_id", articleID);

        if (error) {
          console.error("Error fetching comments:", error.message);
        } else {
          setComments(data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    if (articleID) {
      fetchPost();
      fetchComments();
    }
  }, [articleID]);

  return (
    <Layout>
      <div>
        {post ? <PostDetail post={post} /> : <p>Loading...</p>}    
      <CommentSection comments={comments} postId={articleID} /> {/* Render CommentSection */}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
