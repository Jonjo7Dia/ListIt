import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import styles from "./FeedPost.module.scss";
const FeedPost = () => {
  return (
    <div className={styles["feedPost"]}>
      <PostHeader />
      <PostBody />
      <PostFooter />
    </div>
  );
};

export default FeedPost;
