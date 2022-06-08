import React, { useState, useEffect} from 'react';
import { db } from '../firebase';
import Tweetinput from './Tweetinput';
import styles from './Feed.module.css';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Post from './Post';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      avatar: "",
      id: "",
      image: "",
      text: "",
      timestamp: null,
      username: "",
    },
  ]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unSub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          avatar: doc.data().avatar,
          id: doc.id,
          image: doc.data().image,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          username: doc.data().username,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);

  return (
    <div className={styles.feed}> 
      <Tweetinput/> 

      {posts[0]?.id && (
        <>
          {posts.map((post) =>(
              <Post 
              key={post.id} 
              postId={post.id} 
              avatar={post.avatar} 
              image={post.image} 
              text={post.text} 
              timestamp={post.timestamp}
              username={post.username}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default Feed;
