const BASE_URL ='https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
 for(let code in countryList){
    let newOpt = document.createElement("option");
    newOpt.innerText = code;
    newOpt.value = code;
    if(select.name==="from" && code==="USD"){
        newOpt.selected = "selected";
    }else if(select.name==="to" && code==="INR"){
        newOpt.selected = "selected";
    }
    select.append(newOpt);
 }
 select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
 })
}

const updateFlag=(ele)=>{
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchange= async()=>{
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue===""|| amtValue<0){
        amtValue = 0;
        amount.value = "0";
    }
    const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e64d491deemsh5ee80ed9f0aadc0p1681c7jsn94c23f37d56f',
            'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let data = result.rates[toCurr.value];
        let finalAmt = amtValue*data;
        msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchange();

})

window.addEventListener("load",()=>{
    updateExchange();
})