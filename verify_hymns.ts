import fs from 'fs';

try {
  const data = JSON.parse(fs.readFileSync('./public/hymns.json', 'utf8'));
  console.log(`Total hymns found: ${data.length}`);
  
  const numbers = data.map(h => h.number).sort((a, b) => a - b);
  const missing = [];
  const duplicates = [];
  const seen = new Set();

  for (let i = 1; i <= 267; i++) {
    if (!numbers.includes(i)) {
      missing.push(i);
    }
  }

  numbers.forEach((num, index) => {
    if (numbers.indexOf(num) !== index) {
      duplicates.push(num);
    }
  });

  const invalidEntries = data.filter(h => !h.number || !h.title || !h.lyrics);

  console.log('--- Verification Report ---');
  console.log(`Missing Numbers: ${missing.length > 0 ? missing.join(', ') : 'None'}`);
  console.log(`Duplicate Numbers: ${duplicates.length > 0 ? [...new Set(duplicates)].join(', ') : 'None'}`);
  console.log(`Invalid Entries (missing title/lyrics): ${invalidEntries.length}`);
  
  if (missing.length === 0 && duplicates.length === 0 && invalidEntries.length === 0 && data.length === 267) {
    console.log('SUCCESS: All 267 hymns are present and valid.');
  } else {
    console.log('FAILURE: Data integrity issues found.');
  }
} catch (error) {
  console.error('Error reading or parsing hymns.json:', error);
}
