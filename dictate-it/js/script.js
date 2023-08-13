"use strict"
let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

let textarea = document.querySelector(".textarea");

let prevBtn = document.getElementById("prevBtn");
let playBtn = document.getElementById("playBtn");
let nextBtn = document.getElementById("nextBtn");

let value;
let lineNum = 0, index = 0, prevIndex = 0, prevLineNum = 0, lines, currentWord, currentHighlight, ptr1, ptr2;
let temp;
let cursorInTextarea = false;
// if (localStorage.getItem("textareaValue")) {
//     textarea.value = localStorage.getItem("textareaValue")
//     // call value
// }

window.speechSynthesis.onvoiceschanged = () =>
{
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];
    let m = 0;
    voices.forEach((voice) =>
    {
        // if (voice.name.includes("English")) {
        voiceSelect.options[m] = new Option(voice.name, m);
        m++;
        // }
    });
}
voiceSelect.addEventListener("change", () =>
{
    speech.voice = voices[voiceSelect.value];
})

textarea.addEventListener("keyup", () =>
{
    if ((textarea.innerText === '') || (textarea.innerHTML == '<div><br></div>') || (textarea.innerHTML == '<br>')) {
        textarea.innerHTML = "";
        prevBtn.disabled = true;
        playBtn.disabled = true;
        nextBtn.disabled = true;
    }
    else {
        prevBtn.disabled = false;
        playBtn.disabled = false;
        nextBtn.disabled = false;
    }
})
textarea.addEventListener("focus", () =>
{
    cursorInTextarea = true;
    value = textarea.innerHTML;

    value = value.replaceAll(`<span class="highlight">`, "")
        .replaceAll("</span>", "")

    textarea.innerHTML = value

})
textarea.addEventListener("blur", () =>
{
    // start cleaning
    value = textarea.innerHTML;
    value = value.replace(/\s+/g, ' ')
        .replaceAll(" </div>", "</div>")
        .replaceAll(`&nbsp;<span style="font-family: var(--bs-body-font-family); font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align);">`, " ")
        .replaceAll(`<span style="font-family: var(--bs-body-font-family); font-weight: var(--bs-body-font-weight); text-align: var(--bs-body-text-align);">`, "")
        .replaceAll(`</span>`, ``)
        .replaceAll("&nbsp;", "")
    textarea.innerHTML = value
    // end cleaning ==> sure no (&nbsp; | multiple space | space</div>) 


    value = textarea.innerText;
    if (value != "") {
        lineNum = 0, index = 0, lines = [];
        value = textarea.innerHTML;

        // clean the text from leading newline chars
        while (value.startsWith("<div><br></div>")) {
            value = value.substring("<div><br></div>".length);
        }

        // clear the text from trailing newline chars
        while (value.endsWith("<div><br></div>") || value.endsWith("<div></div>")) {
            if (value.endsWith("<div><br></div>")) value = value.slice(0, -"<div><br></div>".length);
            if (value.endsWith("<div></div>")) value = value.slice(0, -"<div></div>".length);
        }

        value = value.replace(`<span class="highlight">`, "")
            .replace("</span>", "")
            .split("<div>");

        // ensure every line won't start or end with spaces
        value[0] = value[0].trim();
        for (let i = 1; i < value.length; ++i) {
            value[i] = "<div>" + value[i].trim();
        }

        lines = value;
        if ((lines.length >= 1) && (lines[0] == "")) lines.shift();

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].split(" ");
        }


        temp = lines[lineNum][index];

        const pattern = /<\/?div>|&nbsp;|<br>/g;
        if (pattern.test(temp)) {
            if (temp.startsWith("<div>") && temp.endsWith("</div>")) {
                currentWord = temp.replace("<div>", "").replace("</div>", "");
                temp = temp.replace(/<div>(.*?)<\/div>/g, '<div><span class="highlight">$1</span></div>');
                lines[lineNum][index] = temp;
            }
            else if (temp.startsWith("<div>") && temp.endsWith("<br>")) {
                currentWord = temp.replace("<div>", "").replace("<br>", "");
                temp = temp.replace(/<div>(.*?)<br>/g, '<div><span class="highlight">$1</span><br>');
                lines[lineNum][index] = temp;
            }
            else if (temp.startsWith("<div>")) {
                currentWord = temp.replace("<div>", "");
                temp = temp.replace(/<div>(.*?)/g, '<div><span class="highlight">$1') + "</span>";
                lines[lineNum][index] = temp;
            }
            else if (temp.endsWith("</div>")) {
                currentWord = temp.replace("</div>", "");
                temp = temp.replace(/(.*?)<\/div>/g, '<span class="highlight">$1</span></div>');
                lines[lineNum][index] = temp;
            }
        }
        else {
            currentWord = lines[lineNum][index]
            lines[lineNum][index] = `<span class="highlight">${currentWord}</span>`
        }

        // taking a deep copy
        temp = JSON.parse(JSON.stringify(lines));
        for (let i = 0; i < lines.length; i++) {
            temp[i] = lines[i].join(" ");
        }
        textarea.innerHTML = temp.join("");
        let highlightText = document.querySelector(".highlight");
        if ((highlightText.getBoundingClientRect().top) < (textarea.getBoundingClientRect().top)) document.querySelector(".highlight").scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    cursorInTextarea = false;
})

function next()
{
    if ((index == lines[lines.length - 1].length - 1) && (lineNum == lines.length - 1)) return;

    prevLineNum = lineNum
    prevIndex = index
    if (prevIndex == lines[prevLineNum].length - 1) {
        index = 0;
        lineNum++;
    }
    else {
        index++;
    }

    while (lineNum < lines.length && (lines[lineNum][index] == "<div><br></div>" || lines[lineNum][index] == "<div></div>" || lines[lineNum][index] == "<div><br>" || lines[lineNum][index] == "<div>")) {
        lineNum++;
    }
    if (lineNum >= lines.length) return;

    lines[prevLineNum][prevIndex] = lines[prevLineNum][prevIndex].replace(`<span class="highlight">`, "")
        .replace("</span>", "");


    temp = lines[lineNum][index];
    const pattern = /<\/?div>|&nbsp;|<br>/g;
    if (pattern.test(temp)) {
        if (temp.startsWith("<div>") && temp.endsWith("</div>")) {
            currentWord = temp.replace("<div>", "").replace("</div>", "");
            temp = temp.replace(/<div>(.*?)<\/div>/g, '<div><span class="highlight">$1</span></div>');
            lines[lineNum][index] = temp;
        }
        else if (temp.startsWith("<div>") && temp.endsWith("<br>")) {
            currentWord = temp.replace("<div>", "").replace("<br>", "");
            temp = temp.replace(/<div>(.*?)<br>/g, '<div><span class="highlight">$1</span><br>');
            lines[lineNum][index] = temp;
        }
        else if (temp.startsWith("<div>")) {
            currentWord = temp.replace("<div>", "");
            temp = temp.replace(/<div>(.*?)/g, '<div><span class="highlight">$1') + "</span>";
            lines[lineNum][index] = temp;
        }
        else if (temp.endsWith("</div>")) {
            currentWord = temp.replace("</div>", "");
            temp = temp.replace(/(.*?)<\/div>/g, '<span class="highlight">$1</span></div>');
            lines[lineNum][index] = temp;
        }
    }
    else {
        currentWord = lines[lineNum][index]
        lines[lineNum][index] = `<span class="highlight">${currentWord}</span>`
    }

    temp = JSON.parse(JSON.stringify(lines));
    for (let i = 0; i < lines.length; i++) {
        temp[i] = lines[i].join(" ");
    }
    textarea.innerHTML = temp.join("");
    let highlightText = document.querySelector(".highlight");
    if ((highlightText.getBoundingClientRect().top) < (textarea.getBoundingClientRect().top)) document.querySelector(".highlight").scrollIntoView({ behavior: 'smooth', block: 'end' });
    if ((highlightText.getBoundingClientRect().top + highlightText.getBoundingClientRect().height) > (textarea.getBoundingClientRect().top + textarea.getBoundingClientRect().height)) document.querySelector(".highlight").scrollIntoView({ behavior: 'smooth', block: 'end' });
    dictate();
}
function prev()
{
    if ((index == 0) && (lineNum == 0)) return;

    prevLineNum = lineNum
    prevIndex = index
    if (prevIndex == 0) {
        index = lines[prevLineNum - 1].length - 1;
        lineNum--;
    }
    else {
        index--;
    }


    while (lineNum > 0 && (lines[lineNum][index] == "<div><br></div>" || lines[lineNum][index] == "<div></div>" || lines[lineNum][index] == "<div><br>" || lines[lineNum][index] == "<div>")) {
        lineNum--;
        if (prevIndex == 0) index = lines[lineNum].length - 1;
    }
    if (lineNum < 0) return;



    lines[prevLineNum][prevIndex] = lines[prevLineNum][prevIndex].replace(`<span class="highlight">`, "")
        .replace("</span>", "");



    temp = lines[lineNum][index];

    const pattern = /<\/?div>|&nbsp;|<br>/g;
    if (pattern.test(temp)) {
        if (temp.startsWith("<div>") && temp.endsWith("</div>")) {
            currentWord = temp.replace("<div>", "").replace("</div>", "");
            temp = temp.replace(/<div>(.*?)<\/div>/g, '<div><span class="highlight">$1</span></div>');
            lines[lineNum][index] = temp;
        }
        else if (temp.startsWith("<div>") && temp.endsWith("<br>")) {
            currentWord = temp.replace("<div>", "").replace("<br>", "");
            temp = temp.replace(/<div>(.*?)<br>/g, '<div><span class="highlight">$1</span><br>');
            lines[lineNum][index] = temp;
        }
        else if (temp.startsWith("<div>")) {
            currentWord = temp.replace("<div>", "");
            temp = temp.replace(/<div>(.*?)/g, '<div><span class="highlight">$1') + "</span>";
            lines[lineNum][index] = temp;
        }
        else if (temp.endsWith("</div>")) {
            currentWord = temp.replace("</div>", "");
            temp = temp.replace(/(.*?)<\/div>/g, '<span class="highlight">$1</span></div>');
            lines[lineNum][index] = temp;
        }
    }
    else {
        currentWord = lines[lineNum][index]
        lines[lineNum][index] = `<span class="highlight">${currentWord}</span>`
    }

    temp = JSON.parse(JSON.stringify(lines));
    for (let i = 0; i < lines.length; i++) {
        temp[i] = lines[i].join(" ");
    }
    textarea.innerHTML = temp.join("");

    let highlightText = document.querySelector(".highlight");
    if ((highlightText.getBoundingClientRect().top) < (textarea.getBoundingClientRect().top)) document.querySelector(".highlight").scrollIntoView({ behavior: 'smooth', block: 'end' });
    if ((highlightText.getBoundingClientRect().top + highlightText.getBoundingClientRect().height) > (textarea.getBoundingClientRect().top + textarea.getBoundingClientRect().height)) document.querySelector(".highlight").scrollIntoView({ behavior: 'smooth', block: 'end' });
    dictate();
}

function dictate()
{
    speech.text = currentWord;
    window.speechSynthesis.speak(speech);
}

nextBtn.addEventListener("click", next);
prevBtn.addEventListener("click", prev);
playBtn.addEventListener("click", dictate);


document.addEventListener('keydown', (event) =>
{
    if (cursorInTextarea || (textarea.innerText.trim() == "") || (textarea.innerText.trim() == "Write anything here...")) return;

    if (event.key === 'ArrowRight')
        next();
        // nextBtn.click()
    else if (event.key === 'ArrowLeft')
        prev();
        // prevBtn.click()
});

// document.getElementsByTagName("main").addEventListener("click", (e) => {
//     e.stopPropagation();
// })



















// placeholder
const ele = document.getElementById('editMe');

// Get the placeholder attribute
const placeholder = ele.getAttribute('data-placeholder');

// Set the placeholder as initial content if it's empty
ele.innerHTML === '' && (ele.innerHTML = placeholder);

ele.addEventListener('focus', function (e)
{
    const value = e.target.innerHTML;
    value === placeholder && (e.target.innerHTML = '');
});

ele.addEventListener('blur', function (e)
{
    const value = e.target.innerHTML;
    value === '' && (e.target.innerHTML = placeholder);
});
