// 提供计算的方法
function add(v1, v2) {
  return +v1 + +v2;
}
function sub(v1, v2) {
  return v1 - v2;
}
function mul(v1, v2) {
  throw new Error()
  return v1 * v2;
}
function div(v1, v2) {
  return v1 / v2;
}
// 导出方法
module.exports = {
  add: add,
  sub: sub,
  mul: mul,
  div: div
};
