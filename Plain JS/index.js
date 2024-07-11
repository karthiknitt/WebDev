let Name ='Karthik';
let Age=38;
let workEx=15.1;
let maritalStatus=true;
const pi=3.14;
let children=undefined;
let currentJob=null;
let profile = {
    Name: "Karthikeyan",
    Age: 39
};
console.log(typeof(Name));
console.log(typeof(Age));
console.log(typeof(workEx));
console.log(typeof(maritalStatus));
console.log(typeof(pi));
console.log(typeof(children));
console.log(typeof(currentJob));
console.log(typeof(profile));
console.log(profile.Age);
console.log(profile['Name']);

let playingXI=['RS','VK','JB','RP','RA'];
playingXI[5]='HP';
console.log(playingXI);
console.log(playingXI.length);
console.log(typeof(playingXI));

function Greet(timeofDay) {
    console.log('Hello, Good '+timeofDay+'!');
}

Greet('Night');

console.log(typeof(Greet));

function runRate(runs,overs) {
    return runs/overs;
}

console.log(runRate(180,19.5));






