const makeDatePrettier = (dateString) => {
  const date = new Date('2023-07-14')
  return date.toDateString()
}

export {makeDatePrettier}