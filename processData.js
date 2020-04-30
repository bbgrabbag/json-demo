const fs = require('fs');

fs.readdir('./data', (err, files) => {
    const collection = files.filter(f => f !== 'index.js').map(f => require(`./data/${f}`).data);
    fs.mkdir('./output', () => console.log('created new folder "output"'))
    fs.writeFile('./output/data.json', JSON.stringify(collection), () => {
        console.log('Written to output.json file')
    });
})


