const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-08-05/v1/currencies"

const dropdown = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown){
    for(currCode in countryList){
          let newOption = document.createElement("option");
          newOption.innerText = currCode;
          newOption.value = currCode;
          if(select.name === "from" && currCode === "USD")
                    newOption.selected = "selected";
          if(select.name === "to" && currCode === "INR")
                    newOption.selected = "selected";
          select.append(newOption);
    }
    select.addEventListener("change", (event) => {
          updateFlag(event.target);
    })
}


const updateFlag = (element) => {
          let currCode = element.value;
          let countryCode = countryList[currCode];
          let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
          let img = element.parentElement.querySelector("img");
          img.src = newSrc;
}

const updateExchangeRate = async () => {
          let amount = document.querySelector(".amount input");
          let amountValue = amount.value;
          if(amountValue < 1 || amountValue === ""){
                    amountValue = 1;
                    amount.value = 1;
                    alert("Invalid amount entered");
          }

          const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
          let response = await fetch(URL);
          let data = await response.json();
          let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
          // console.log(rate);
          let finalAmount = amountValue * rate;
          msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}


window.addEventListener("load", () => {
          updateExchangeRate();
})

btn.addEventListener("click", async (event) => {
          event.preventDefault();
          updateExchangeRate();
})