var allQuotes = [];
let allEpisodes;
let allBBEpisodes = [];
let noSeries = new Set();

let QuoteParent = document.getElementById("QuoteCards");
let seasonParent = document.getElementById("seasonCards");
let dropDown = document.getElementById("seasonDropdown");
let searchEpisode = document.getElementById("searchEpisode");

let currSeason = [];
let oldCurrSeason = [];

const renderCurrSeason = curr =>{
    console.log("OLD", oldCurrSeason);
    curr.forEach(season =>{
        let newCard = document.createElement("div");
        newCard.className = "card";
        
        let title =  document.createElement("p")
        let episode =  document.createElement("p")
        let airDate =  document.createElement("p")

        title.innerHTML = season.title;
        episode.innerHTML = season.episode;
        airDate.innerHTML = season.air_date;

        title.className = "episode";
        episode.className = "episode";
        airDate.className = "episode";

        newCard.appendChild(episode);
        newCard.appendChild(title);
        newCard.appendChild(airDate);
        
        seasonParent.append(newCard);
        console.log(season.title);
        console.log(season.episode);
        console.log(season.air_date);
    });
    console.log("------");
}

searchEpisode.addEventListener("keyup", e=>{
    let query = e.target.value;
    currSeason.length = 0;
    seasonParent.replaceChildren();

    if(query){
        currSeason = [...oldCurrSeason].filter(curr=>{
            return curr.title.toLowerCase().includes(query.toLowerCase())
        });
        renderCurrSeason(currSeason);
    }
    else{
        renderCurrSeason(oldCurrSeason);
    }

    console.log(query);
})

const filterEpisode =  s =>{
    currSeason.length = 0;
    seasonParent.replaceChildren();
    const season = s.target.value;
    
    if(season !== "-1"){
        allBBEpisodes.forEach(ep=>{
            if(ep.season === season){
                currSeason.push(ep);
            }
        })
        oldCurrSeason = [...currSeason];
    }
    console.log(currSeason);
    renderCurrSeason(currSeason);
}
dropDown.addEventListener('change', filterEpisode);

const populateDropDown = _=>{
    allEpisodes.forEach(ep=>{
        if(ep.series === 'Breaking Bad'){
            allBBEpisodes.push(ep);
            noSeries.add(ep.season.trim());
        }
    })
    console.log("BB", allBBEpisodes);
    console.log("NS", noSeries);
    [...noSeries].forEach(s =>{
        console.log(s);
        let option = document.createElement("option");
        option.value = s;
        option.innerHTML = s;
        option.class = "option";
        dropDown.appendChild(option);
    });
}

const populateQuotes =  _=>{
    fetch("https://www.breakingbadapi.com/api/quotes")
        .then(res => res.json())
        .then(data => allQuotes.push(data))
        .catch(err => console.error(err));
}
populateQuotes();

const populateSeasons= async _=>{
    await fetch("https://www.breakingbadapi.com/api/episodes")
    .then(res => res.json())
    .then(data => allEpisodes = data)
    .then(_=>populateDropDown())
    .catch(err => console.error(err));

    console.log(allEpisodes);
}
populateSeasons();



document.getElementById("numberOfQuotesBtn").addEventListener("click",async _=>{
    QuoteParent.replaceChildren();

    let numberOfQuotes = parseInt(document.getElementById("numberOfQuotes").value);
    console.log(numberOfQuotes);

    if(numberOfQuotes > 70 || isNaN(numberOfQuotes)){
        alert("Enter nums between (1-70)");
        return;
    }

    const shuffledQuotes = allQuotes[0].sort(() => 0.5 - Math.random());
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
