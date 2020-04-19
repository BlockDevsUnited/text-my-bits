export const dayMath = (days, today = new Date()) => {
  const result = new Date(today);
  return result.setDate(result.getDate() + days);
};

export const formatDate = (date) => {
  const result = new Date(date);
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${result.getDate()} / ${monthArray[result.getMonth()]} / ${result.getFullYear()}`;
};
