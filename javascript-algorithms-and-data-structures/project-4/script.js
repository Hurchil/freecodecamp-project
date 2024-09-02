const form = document.getElementById("form");
const input = document.getElementById("cash");
const output = document.getElementById("change-due");

let price = 19.5;

document.querySelector("#total-payer > span").innerText = "$" + price;

let cid = [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100]
];

const values = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
}



function update_list_contenu() {
    const list_contenu = document.getElementById("list-contenu");
    list_contenu.innerHTML = "";
    for (const [key, value] of cid) {
        const li = document.createElement('li');
        li.innerHTML = `${key}: <span class="valeur-contenue">$${value.toFixed(2)}</span>`
        list_contenu.appendChild(li);
    }
}

update_list_contenu();



function cash_handler(cash) {
    let rest = (cash - price).toFixed(2);
    let result = {};
    
    for (const [key, unitValue] of Object.entries(values).reverse()) {
        let cidItem = cid.find(item => item[0] === key);
        if (!cidItem) continue;
        let available = cidItem[1];
        
        while (rest >= unitValue && available >= unitValue) {
            available = Number((available - unitValue).toFixed(2));
            rest = Number((rest - unitValue).toFixed(2));
            result[key] = Number(((result[key] || 0) + unitValue).toFixed(2));
        }
        
        cidItem[1] = available;
    }

    return rest > 0 ? null : to_string(result);
}

function to_string(obj) {
    let result = "";
    for (const [key, value] of Object.entries(obj)) {
        result += ` ${key}: ` + `$${value}`
    }
    return result;
}


function is_closed() {
    for (const [key, value] of cid) {
        if (value) {
            return false
        }

    }
    return true;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const number = Number(input.value);
    if (number < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    else if (number === price) {
        output.innerText = "No change due - customer paid with exact cash";
        output.style.color = "blue";
    }

    else {
        const result = cash_handler(number);
        if (!result) {
            output.innerText = "Status: INSUFFICIENT_FUNDS";
            output.style.color = "red";
        }
        else {
            output.innerText = is_closed() ? "Status: CLOSED" + result : "Status: OPEN" + result;
            output.style.color = "green";
            update_list_contenu();
        }
    }

})