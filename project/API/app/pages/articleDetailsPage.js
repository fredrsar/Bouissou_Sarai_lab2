// PostDetailPage.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PostDetail from "./PostDetail";
import { supabase } from "./supabase-config";

const PostDetailPage = () => {
  const router = useRouter();
  const postId = router.query.id; // Assuming you're using Next.js routing with query parameters
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post from the database and update state
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();
        if (error) {
          console.error("Error fetching post:", error.message);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  return (
    <Layout>
      <div>
        {post ? <PostDetail post={post} /> : <p>Loading...</p>}
      </div>
    </Layout>
  );
};

export default PostDetailPage;
