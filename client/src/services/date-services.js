const makeDatePrettier = (dateString) => {
  const date = new Date(dateString.slice(0, -1));
  return date.toDateString().slice(0, 10);
};

export { makeDatePrettier };
