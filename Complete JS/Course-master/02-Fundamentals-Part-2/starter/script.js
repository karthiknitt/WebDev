'use strict';
const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;
const checkWinner = function (avgDolphins, avgKoalas) {
  if (avgDolphins > 2 * avgKoalas) {
    console.log(`Dolphins Win - (${avgDolphins} vs ${avgKoalas})`);
  } else if (avgKoalas > 2 * avgDolphins) {
    console.log(`Koalas Win - (${avgKoalas} vs ${avgDolphins})`);
  } else {
    console.log(
      `Nobody wins. Dolphins - ${avgDolphins} vs Koalas - ${avgKoalas}`
    );
  }
};
// Test Data 1
const dScore = calcAverage(44, 23, 71);
const kScore = calcAverage(65, 54, 49);
checkWinner(dScore, kScore);

// Test Data 2
const dScore1 = calcAverage(85, 54, 41);
const kScore1 = calcAverage(23, 34, 27);
checkWinner(dScore1, kScore1);

// coding challenge#6

const calcTip = billValue =>
  billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;
const bill = new Array(125, 555, 44);
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const totals = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(tips);
console.log(totals);

// coding challenge#7

const mark = {
  fName: 'Mark Miller',
  mass: 78,
  height: 1.69,
  calcBMI: function (Mass, Height) {
    Mass = this.mass;
    Height = this.height;
    this.BMI = Mass / Height ** 2;
    return this.BMI;
  },
};

const john = {
  fName: 'John Smith',
  mass: 92,
  height: 1.95,
  calcBMI: function (Mass, Height) {
    Mass = this.mass;
    Height = this.height;
    this.BMI = Mass / Height ** 2;
    return this.BMI;
  },
};

mark.calcBMI();
john.calcBMI();

mark.BMI > john.BMI
  ? console.log(
      `${mark.fName}'s BMI (${mark.BMI}) is higher than ${john.fName}'s BMI (${john.BMI}).`
    )
  : console.log(
      `${john.fName}'s BMI (${john.BMI}) is higher than ${mark.fName}'s BMI (${mark.BMI}).`
    );

// coding challenge#8

// for (let i = 0; i < 10; 1++) {
//     if (billValues[i] >= 50 && billValues[i] <= 300) {
//         tipValues[i] = billValues[i] * .15;
//         totalValues[i] = tipValues[i] + billValues[i];
//     }
//     else {
//         tipValues[i] = billValues[i] * .20;
//         totalValues[i] = tipValues[i] + billValues[i];
//     }
// }

// coding challenge#8
// alternate solution as asked in the challenge

// for (let i = 0; i < 10; 1++) {
//     const t = calcTip(billValues[i]);
//     tipValues.push(t);
//     totalValues.push(t + billValues[i]);
// }
// console.log(tipValues);
// console.log(totalValues);
