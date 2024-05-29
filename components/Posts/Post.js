import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const ProfileInitials = styled.div(() => ({
  width: '40px',
  height: '40px',
  backgroundColor: '#007bff',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontSize: '16px',
  fontWeight: 'bold',
  marginRight: '10px',
}));

const ProfileContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
}));

const ProfileDetails = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'hidden',
  position: 'relative',
  scrollBehavior: 'smooth',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  width: '100%',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 10px',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const currentScroll = carouselRef.current.scrollLeft;
      const childWidth = carouselRef.current.firstChild.clientWidth;
      const newScrollPosition = currentScroll + childWidth;

      if (newScrollPosition >= scrollWidth) {
        carouselRef.current.scrollTo({ left: 0 });
      } else {
        carouselRef.current.scrollBy({ left: childWidth });
      }
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      const currentScroll = carouselRef.current.scrollLeft;
      const childWidth = carouselRef.current.firstChild.clientWidth;
      const newScrollPosition = currentScroll - childWidth;

      if (newScrollPosition < 0) {
        carouselRef.current.scrollTo({ left: carouselRef.current.scrollWidth });
      } else {
        carouselRef.current.scrollBy({ left: -childWidth });
      }
    }
  };

  const initials = post.userName
    .split(' ')
    .map((name) => name.charAt(0))
    .join('');

  return (
    <PostContainer>
      <ProfileContainer>
        <ProfileInitials>{initials}</ProfileInitials>
        <ProfileDetails>
          <h6>Leanne Graham</h6>
          <h6>Sincere@april.biz</h6>
        </ProfileDetails>
      </ProfileContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;



