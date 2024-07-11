const calcTip = billValue =>
  billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
const billValues = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tipValues = [];
const totalValues = [];
for (let i = 0; i < 10; i++) {
  const t = calcTip(billValues[i]);
  tipValues.push(t);
  console.log(t);
  totalValues.push(t + billValues[i]);
}
console.log(tipValues);
console.log(totalValues);

const calcAvg = function (totals) {
  let sum = 0;
  for (let j = 0; j < totals.length; j++) {
    sum += totals[j];
  }
  console.log(sum);
  // console.log(`Average of Array is ${sum / totals.length}`);
  return sum / totals.length;
};

console.log(calcAvg(totalValues));
console.log(calcAvg(tipValues));
