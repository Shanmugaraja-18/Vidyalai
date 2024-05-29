import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import Post from './Post';
import Container from '../common/Container';
import { useWindowWidth } from '../../context/WindowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const { isSmallerDevice } = useWindowWidth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: fetchedPosts } = await axios.get('/api/v1/posts', {
          params: { start: 0, limit: 100 }, // Fetching all posts
        });
        setAllPosts(fetchedPosts);
        setPosts(fetchedPosts.slice(0, 6)); // Initially displaying only 6 posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPost();
  }, [isSmallerDevice]);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setDisplayedPosts(prevDisplayedPosts => {
        const newDisplayedPosts = prevDisplayedPosts + 6;
        setPosts(allPosts.slice(0, newDisplayedPosts));
        setIsLoading(false);
        return newDisplayedPosts;
      });
    }, 3000);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {posts.length < allPosts.length && (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        )}
      </div>
    </Container>
  );
}
