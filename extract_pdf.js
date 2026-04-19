const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/attached_assets/Wende_Nyasaye_Molos_Manyien-1-1-1-compressed_1776098053524.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('hymns_dump.txt', data.text);
    console.log('PDF extracted to hymns_dump.txt');
}).catch(err => {
    console.error(err);
});
