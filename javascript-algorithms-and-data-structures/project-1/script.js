const form = document.getElementById("main-form");
const input = document.getElementById("text-input");
const result = document.getElementById("result");

function is_palindrome(text) {
    let filter_text = "";
    let reverse_filter_text = "";
    let i = 0;
    let j = text.length - 1;
    while (i < text.length && j >= 0) {
        if (/[a-zA-Z0-9]/.test(text[i])) {
            filter_text += text[i];
        }
        if (/[a-zA-Z0-9]/.test(text[j])) {
            reverse_filter_text += text[j];
        }

        i += 1;
        j -= 1;
    }
    return filter_text.toUpperCase() === reverse_filter_text.toUpperCase();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = input.value.trim();
    if (!text) {
        alert("Please input a value");
        return;
    }
    if (is_palindrome(text)) {
        result.innerText = text + " is a palindrome.";
        result.style.color = "green";
    }
    else {
        result.innerText = text + " is not a palindrome.";
        result.style.color = "red";
    }
    input.value = "";
})