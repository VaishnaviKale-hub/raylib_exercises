function sqr(x) {
  return x * x;
}

function sqrt(x) {
  return x ** 0.5;
}

function distance(x, y) {
  return sqrt(sqr(x) + sqr(y));
}

module.exports = {
  sqr,
  sqrt,
  distance,
};