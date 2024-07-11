import fs from "fs";

fs.readFile("node.txt", "utf-8", (err, data) => {
  try {
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
