import { convert as convertPosts } from './postsHelper';

async () => {
  try {
    convertPosts();
  } catch (err) {
    console.error(err);
  }
}();
