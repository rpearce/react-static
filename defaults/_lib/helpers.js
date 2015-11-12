export const execCallback = (err) => {
  if (err !== null) { throw err; }
};

export const fspCallback = (err) => {
  if (err) { throw err; }
};
