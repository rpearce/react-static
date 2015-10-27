import build from './components';

async () => {
  try {
    build();
  } catch (err) {
    console.error(err);
  }
}();
