var fs = require('fs')

const main = () => {
  let size = 300;

  for (let i = 0; i < size * size; i++) {
    const rawData = {
      x: i % size,
      y: Math.floor(i / size),
    };
    const dataStream = JSON.stringify(rawData);
    fs.writeFile(`./output/${i}.json`, dataStream, () => {});
    console.log(i);
  }
};

main();
