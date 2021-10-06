const spyed = {
  save:[],
  triggered(data) {
    this.save.push(data);
  },
};

export default spyed