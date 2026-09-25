function sqr(x) {
  return x * x;
}
function sqrt(x) {
  return x ** 0.5;
}

function distance(sX, sY, x, y) {
  return sqrt(sqr((sX - x)) + sqr((sY - y)));
}

module.exports = {
  sqr,
  sqrt,
  distance,
};