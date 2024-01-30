import React from "react";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import styles from "./FeedPost.module.scss";

// Define the List interface
interface List {
  listName: string;
  listItems: string[];
  isPublic: boolean;
  likes: string[];
  comments: string[];
  createdAt: Date;
  createdBy: string;
  profilePicUrl: string;
  username: string;
}

// Define the FeedPostProps interface
interface FeedPostProps {
  list: List;
}

// Update the FeedPost component to accept props
const FeedPost: React.FC<FeedPostProps> = ({ list }) => {
  return (
    <div className={styles["feedPost"]}>
      <PostHeader profilePic={list.profilePicUrl} createdBy={list.username} />
      <PostBody listName={list.listName} listItems={list.listItems} />
      <PostFooter
        postLikes={list.likes}
        comments={list.comments}
        createdAt={list.createdAt}
      />
    </div>
  );
};

export default FeedPost;
