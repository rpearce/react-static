import mdHelper from './mdHelper';

async () => {
  try {
    mdHelper.convertMds();
  } catch (err) {
    console.error(err);
  }
}();
