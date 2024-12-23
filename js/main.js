const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field");
timeTag = document.querySelector
mistakeTag = document.querySelector(".mistake span")

let charIndex = mistakes = 0; // makes both 0

function randomParagraph(){
    // getting random paragraph  
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randomIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        //adding each character inside span then adding it inside p
        typingText.innerHTML += spanTag
    });
    // focusing input field on keyboard or click event
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}

function initTyping(){
    const characters = typingText.querySelectorAll("span")
    let typedChar = inpField.value.split("")[charIndex];
    // if u havent entered any character or pressed backpace
    if(typedChar == null){
        charIndex--;
        if( characters[charIndex].classList.contains("incorrect")){
            mistakes++;
        }
        characters[charIndex].classList.remove("correct", "incorrect")
    }
    else{
        if(characters[charIndex].innerText === typedChar){
            characters[charIndex].classList.add("correct")
            
        }
        else{
            mistakes++
            characters[charIndex].classList.add("incorrect")
        }
        charIndex++;
    }

    characters.forEach(span => span.classList.remove("active"))
    characters[charIndex].classList.add("active")

    mistakeTag.innerText = mistakes;
}

randomParagraph()
inpField.addEventListener("input", initTyping)