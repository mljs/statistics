/**
 * Mann-Whitney rank test on sets x1 and x2
 *
 * Parameters:
 * x1, x2 - 1D arrays
 */

export function UTest(x1, x2) {
  var len_x1 = x1.length;
  var len_x2 = x2.length;

  var con_array = x1.concat(x2);
  var sorted = con_array.slice().sort(function(a, b) {
    return b - a;
  });
  var ranks = con_array.slice().map(function(v) {
    return sorted.indexOf(v) + 1;
  });

  var rank_x1 = ranks.slice(0, len_x1);
  var u1 = rank_x1.reduce((a, b) => a + b, 0);
  var u2 = ranks.reduce((a, b) => a + b, 0) - u1;

  return [u1, u2];
}

var array1 = [1, 3, 5];
var array2 = [2, 4, 6];

var r = UTest(array1, array2);
console.log(r);
