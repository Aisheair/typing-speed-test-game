const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span")
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button")

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0; // makes both 0

function randomParagraph(){
    // getting random paragraph  
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    // getting random item from the paragraphs array, splitting all characters
    // of it, adding each characters inside span and then adding this span inside p tag
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        //adding each character inside span then adding it inside p
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on keyboard or click event
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}

function initTyping(){
    const characters = typingText.querySelectorAll("span")
    let typedChar = inpField.value.split("")[charIndex];
    //the timer will only start when the user typed 1 char or the timer is greater than 0
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) { // once timer is start, it wont restart again on every key clicked
            timer = setInterval(intTimer, 1000)
            isTyping = true;
        }
        
        // if u havent entered any character or pressed backpace
        if(typedChar == null){
            charIndex--; // decrement charIndex
            // decrement mistakes only if the charIndex span contains incorrect class
            if( characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        }
        else{
            if(characters[charIndex].innerText === typedChar){
                // if user typed character and show character matched then add the
                // correct class else increment the mistakes and add the incorrect class
                characters[charIndex].classList.add("correct")
                
            }
            else{
                mistakes++
                characters[charIndex].classList.add("incorrect")
            }
            charIndex++; //increment charIndex either user typed correct or incorrect character
    }
    }
    else{
        clearInterval(timer)
    }

    characters.forEach(span => span.classList.remove("active"))
    characters[charIndex].classList.add("active")

    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60)
    // if wpm value is ), empty, or infinity then setting its value to 0
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes
}

function intTimer(){
    // if timeleft is gerater than 0 then decrement the timeLeft else clear the timer
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft; // cpm will not count mistake

    }
    else{
        inpField.value = "";
        clearInterval(timer);
    }
}

function resetGame(){
    // calling loadParagraph function and
    // resetting each variables and elements value to default
    randomParagraph()
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}

randomParagraph()
inpField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)