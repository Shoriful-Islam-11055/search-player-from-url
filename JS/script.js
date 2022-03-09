const searchPlayer = () =>{
    const inputField = document.getElementById('searchArea');
    const Playername = inputField.value;
    // console.log(url);
    inputField.value = '';

    // clear details information when search player
    const playerInfoDetails = document.getElementById('player-info');
    playerInfoDetails.textContent = '';
    document.getElementById('female-player').style.display = "none";
    document.getElementById('male-player').style.display = "none";


    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${Playername}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayplayer(data.player));      
}

//Show all searching player 
const displayplayer = players => {
    const playerCardField = document.getElementById('players-card');
    playerCardField.textContent = '';
    
    for(const singlePlayer of players){
        // console.log(singlePlayer.idPlayer);
        const makeDiv = document.createElement('div');
        makeDiv.classList.add('col-lg-6','col-md-12','col-12');
        makeDiv.innerHTML = `
            <div class="card h-100">
            <img src="${singlePlayer.strThumb}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${singlePlayer.strPlayer}</h5>
                    <p class="card-text">${singlePlayer.strDescriptionEN.slice(0, 120)}..</p>
                </div>
                <div class="card-footer d-flex justify-content-around">
                    <a onclick = "playerDelete(${singlePlayer.idPlayer}) href="#" class="btn btn-danger me-2">Delete</a>
                    <a onclick = "playerDetails(${singlePlayer.idPlayer})" href="#" class="btn btn-primary ms-2">Details</a>
                </div>
            </div> `
        playerCardField.appendChild(makeDiv);
    }
}

//show Single player deatails info using there ID
const playerDetails = playerId =>{
    //  console.log(playerId);
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id= ${playerId}`)
    .then(res => res.json())
    .then(data => displayPlayerDetails(data.players[0]));
}

const displayPlayerDetails = playerIdenty =>{
    //  console.log(playerIdenty);
    const playerInfoDetails = document.getElementById('player-info');
    // playerInfoDetails.textContent = '';

    if(playerIdenty.strGender == "Male"){
        // console.log("hello");
        document.getElementById('male-player').style.display = "block";
        document.getElementById('female-player').style.display = "none";
    }
    else{
        document.getElementById('female-player').style.display = "block";
        document.getElementById('male-player').style.display = "none";
    }

    playerInfoDetails.innerHTML =`
    <div class="card">
        <div class="card-body">
            <div class ="">
                <h5 class="card-title text-center">Name: ${playerIdenty.strPlayer}</h5>
                <h5 class="card-title text-center">Country: ${playerIdenty.strNationality}</h5>
                <h5 class="card-title text-center">Gender: ${playerIdenty.strGender}</h5>
            </div>
            <p class="card-text">${playerIdenty.strDescriptionEN.slice(0, 200)}...</p>
        </div>
    </div>
    `
}

// https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=Danny%20Welbeck
// https://www.thesportsdb.com/api.php