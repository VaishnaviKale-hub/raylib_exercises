function calcOffset(outer, inner, x) {
  return (outer - inner) / 2 + x;
}

function innerRecDimentions(outer, inner) {
  inner = inner * 100;
  return (outer / 100) * inner;
}

module.exports = {
  calcOffset,
  innerRecDimentions,
};