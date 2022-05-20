const inputBtn = document.querySelector('#input_button');
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const grc = require('greek-transliteration');
const transliterate = grc.transliterate;


inputBtn.addEventListener('click', () => {
    let grcText = input.value;
    let transText = transliterate(grcText);
    output.value = transText;
})
