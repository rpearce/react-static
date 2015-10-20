Array.prototype.clean = function() {
  const args = [].slice.call(arguments);
  return this.filter(item => args.indexOf(item) === -1);
};
