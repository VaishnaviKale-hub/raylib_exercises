function maxValue(data) {
  let large = data[0];
  for (let i = 0; i < data.length; i++) {
    if (large < data[i + 1]) large = data[i + 1];
  }
  return large;
}

function calculateAverage(data) {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum / data.length;
}

module.exports = {
  maxValue,
  calculateAverage,
};
