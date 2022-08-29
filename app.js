var uniqueQuotes = [];
const populateQuotes =  _=>{
    fetch("https://www.breakingbadapi.com/api/quotes")
        .then(res => res.json())
        .then(data => uniqueQuotes.push(data))
        .catch(err => console.error(err));
}

populateQuotes();

document.getElementById("numberOfQuotesBtn").addEventListener("click",async _=>{
    let QuoteParent = document.getElementById("QuoteCards");
    QuoteParent.replaceChildren();

    let numberOfQuotes = parseInt(document.getElementById("numberOfQuotes").value);
    console.log(numberOfQuotes);

    if(numberOfQuotes > 70 || isNaN(numberOfQuotes)){
        alert("Enter nums between (1-70)");
        return;
    }

    const shuffledQuotes = uniqueQuotes[0].sort(() => 0.5 - Math.random());
    let randomSelectedQuotes = shuffledQuotes.slice(0, numberOfQuotes);

    console.log("random", randomSelectedQuotes);

    randomSelectedQuotes.forEach(q => {  
        let quote = q.quote;
        let author = q.author;
        let newCard = document.createElement("div");
        newCard.innerHTML = quote;
        newCard.innerHTML += "-"+author;
        newCard.className = "card";
        QuoteParent.appendChild(newCard);
    });
});
