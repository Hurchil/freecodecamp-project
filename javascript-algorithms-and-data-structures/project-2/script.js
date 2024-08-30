const input = document.getElementById('number');
const form = document.getElementById('form');
const reset_btn = document.getElementById("reset-btn");
const result = document.getElementById("output")

function reset(){
    input.innerText = "";
}

form.addEventListener("submit", event => {
    event.preventDefault();
    const number = parseInt(input.value);
    if(!number && number !== 0){
        result.innerText = "Please enter a valid number";
        return;
    }
    if(number < 1){
        result.innerText = "Please enter a number greater than or equal to 1";
        return;
    }
    if(number > 3999){
        result.innerText = "Please enter a number less than or equal to 3999";
        return;
    }

    result.innerText = to_roman(number);

    
})

function to_roman(number){
    let result = "";


    // Pour les miliers
    let i = Math.floor(number / 1000);
    number -= i*1000;
    while(i > 0){
        result += "M"
        i -= 1;
    }

    
    
    // Pour les centaines
    i = Math.floor(number / 100);
    number -= (i*100);
    switch(i){
        case 1: result += "C"; break;
        case 2: result += "CC"; break;
        case 3: result += "CCC"; break;
        case 4: result += "CD"; break;
        case 5: result += "D"; break;
        case 6: result += "DC"; break;
        case 7: result += "DCC"; break;
        case 8: result += "DCCC"; break;
        case 9: result += "CM"; break;
    }

    

    // Pour les dizaines
    i = Math.floor(number / 10);
    number -= (i*10);
    switch(i){
        case 1: result += "X"; break;
        case 2: result += "XX"; break;
        case 3: result += "XXX"; break;
        case 4: result += "XL"; break;
        case 5: result += "L"; break;
        case 6: result += "LX"; break;
        case 7: result += "LXX"; break;
        case 8: result += "LXXX"; break;
        case 9: result += "XC"; break;
    }
    

    // Pour les unités
    switch(number){
        case 1: result += "I"; break;
        case 2: result += "II"; break;
        case 3: result += "III"; break;
        case 4: result += "IV"; break;
        case 5: result += "V"; break;
        case 6: result += "VI"; break;
        case 7: result += "VII"; break;
        case 8: result += "VIII"; break;
        case 9: result += "IX"; break;
    }

    return result;

}