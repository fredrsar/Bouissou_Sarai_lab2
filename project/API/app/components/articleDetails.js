const PostDetail = ({ post }) => {
    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        {/* Add comments rendering here */}
      </div>
    );
  };
  
  export default PostDetail;
  