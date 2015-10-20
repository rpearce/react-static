import './helpers/array';
import convertPosts from './helpers/posts';

async () => {
  try {
    convertPosts();
  } catch (err) {
    console.error(err);
  }
}();
