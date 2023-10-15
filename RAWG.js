const gameTitle = document.getElementById("")

const apiKey = "7f48b16c6de34092abdc24716b96cdad";

async function gameInfo() {
    const response = await fetch ("https://api.rawg.io/api/games?key=" + apiKey + "&search=" + );
    const gameData = await response.json;
    console.log(gameData);
}