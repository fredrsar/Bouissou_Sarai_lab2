import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useUser } from "@/components/UserContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";

const PostForm = ({ onPostSubmit, onCancel }) => {
  const router = useRouter();
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const generateRandomId = () => {
    return uuidv4(); // Generate a random UUID
  };

  const handleSave = async () => {
    // Check if the user is logged in
    if (!user) {
      // Redirect to the login page or show a message
      router.push("/");
      return;
    }

    // Validate form fields
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required");
      return;
    }

    const id_article = generateRandomId();
    console.log("id-article: ", id_article);

    // Save post to the database
    try {
      const { data, error } = await supabase.from("posts").insert([
        {
          id_article,
          title,
          content,
          user_ID: user.id,
          created_at: new Date(),
        },
      ]);

      if (error) {
        console.error("Error saving post:", error.message);
      } else {
        // Notify the parent component of successful submission
        onPostSubmit(data[0]);
      }
    } catch (error) {
      console.error("Error saving post:", error.message);
    }
  };

  return (
    <Layout><center>
      <div className="post-form-container">
        <h2>Create a New Post</h2>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div className="form-actions">
          <button className="btn-blue" onClick={handleSave}>
            POST
          </button> <br></br><br></br>
          <button className="btn-red" onClick={onCancel}>
            CANCEL
          </button>
        </div>
      </div>

      <style jsx>{`
        .post-form-container {
          margin: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .btn-blue {
          background-color: #3490dc;
          color: #fff;
        }

        .btn-red {
          background-color: #e53e3e;
          color: #fff;
        }
      `}</style></center>
    </Layout>
  );
};

export default PostForm;
