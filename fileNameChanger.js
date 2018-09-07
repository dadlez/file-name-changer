'use strict';
const fs = require('fs');
const path = require('path');

const PATH = process.argv[2];
console.log(PATH)
const oldFileNames = fs.readdirSync(PATH, { withFileTypes: true });
const newFileNames = {};
const VALID_CHARS = ['.','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','9','8','7','6','5','4','3','2','1'];
const SWITCH_CHARS = { 
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
  Ą: 'A',
  Ć: 'C',
  Ę: 'E',
  Ł: 'L',
  Ń: 'N',
  Ó: 'O',
  Ś: 'S',
  Ź: 'Z',
  Ż: 'Z'
}
const updateLetter = (str) => {
  if (VALID_CHARS.includes(str)) return str;
  return SWITCH_CHARS[str] || '';
};

oldFileNames.forEach(name => {
  const letters = Array.from(name);

  const newLetters = letters.reduce((result, letter) => {
    const updatedLetter = updateLetter(letter);
    console.log(letter, updatedLetter)
    result.push(updatedLetter)
    return result;
  }, [])

  newFileNames[name] = newLetters.join('');
});

for (let file in newFileNames) {
  fs.renameSync(path.join(PATH, file), path.join(PATH, newFileNames[file]));
}