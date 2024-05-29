const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImagesAndUserDetails = await Promise.all(
      posts.map(async (post) => {
        const { data: albumPhotos } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);

        const images = albumPhotos.map((photo) => ({
          url: 'https://picsum.photos/200/300', 
        }));

        const user = await fetchUserById(post.userId);

        if (!user || !user.name) {
          return {
            ...post,
            images,
            userName: 'Unknown', 
          };
        }

        const [firstName, lastName] = user.name.split(' ');

        const firstLetterFirstName = firstName.charAt(0);
        const firstLetterLastName = lastName.charAt(0);

        const nameInitials = `${firstLetterFirstName}${firstLetterLastName}`;

        return {
          ...post,
          images,
          userName: `${nameInitials}. ${user.email}`, 
        };
      })
    );

    res.json(postsWithImagesAndUserDetails);
  } catch (error) {
    console.error('Error fetching posts with images and user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
