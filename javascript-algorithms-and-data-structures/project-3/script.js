const input = document.getElementById("user-input");
const form = document.getElementById("form");
const output = document.getElementById('results-div');

document.getElementById('reset-btn').addEventListener("click", event => {
    event.preventDefault();
    input.value = "";
});

document.getElementById('clear-btn').addEventListener("click", event => {
    event.preventDefault();
    output.innerText = "";
});

form.addEventListener('submit', event => {
    event.preventDefault();

    let number = input.value;
    if(number === ""){
        alert("Please provide a phone number");
        return;
    }

    if(check_us_number(number)){
        output.innerText = "Valid US number: " + number;
        output.style.color = "green";
    }
    else{
        output.innerText = "Invalid US number: " + number;
        output.style.color = "red";
    }
})


function check_us_number(number){

    const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/;

    return regex.test(number);


}
