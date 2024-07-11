const massMark = 95, massJohn = 85;
const heightMark = 1.88, heightJohn = 1.76;
let bmiMark, bmiJohn;
// massMark = 95;
// massJohn = 85;
// heightMark = 1.88;
// heightJohn = 1.76;
bmiMark = massMark / (heightMark ** 2);
bmiJohn = massJohn / (heightJohn ** 2);
console.log(bmiMark, bmiJohn);
const markHigherBMI = bmiMark > bmiJohn;
if (markHigherBMI) {
    console.log(`Mark's BMI (${bmiMark}) is Higher than that of John's🙌(${bmiJohn})`);
}
else {
    console.log(`John's BMI (${bmiJohn}) is Higher than that of Mark's🙌 (${bmiMark})`);
}
console.log(markHigherBMI);

// Usage of backticks in template literals
let fName, job;
const Age = 38;
fName = `Karthik`;
job = `Program manager`;
console.log(`Hi, I'm ${fName}! I'm ${Age} years old and I'm a ${job}.`);

console.log(`Hi, I'm ${fName}!
     I'm ${Age} years old 
     and I'm a ${job}.`);

console.log('16' != 16);
console.log('16' !== 16);

const dScore1 = 97, dScore2 = 112, dScore3 = 101;
const kScore1 = 109, kScore2 = 95, kScore3 = 106;
const dAvg = (dScore1 + dScore2 + dScore3) / 3;
const kAvg = (kScore1 + kScore2 + kScore3) / 3;
const dminScore = dScore1 > 100 || dScore2 > 100 || dScore3 > 100;
const kminScore = kScore1 > 100 || kScore2 > 100 || kScore3 > 100;

if (dAvg > kAvg) {
    console.log('Dolphins Win!');
}
else if (dAvg === kAvg) {
    console.log("It's a tie!");
}
else {
    console.log("Kaolas Win!");
}

if (dAvg > kAvg && dminScore) {
    console.log('Dolphins Win!');
}
else if (dAvg === kAvg && kminScore && dminScore) {
    console.log("It's a tie!");
}

else if (dAvg < kAvg && kminScore) {
    console.log("Kaola's Win");
}
else {
    console.log("No one has won");
}

const bValue = 430;
const tip = (bValue >= 50 && bValue <= 300) ? bValue * .15 : bValue * .2;
console.log(`Bill value is ${bValue}, Tip value is ${tip} and Total value is ${bValue + tip}`);
