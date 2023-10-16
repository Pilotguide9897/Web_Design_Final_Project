document.addEventListener("DOMContentLoaded", (event) => {
  const gameTitle = document.getElementById("masterpiece1");
  const apiKey = "7f48b16c6de34092abdc24716b96cdad";
  var battlefield4ESRB = document.getElementById("battlefield4ESRB");

  async function gameInfo(gameTitle, apiKey, battlefield4ESRB) {
    if (!gameTitle) {
      console.error("gameTitle element not found!");
      return;
    }
    console.log(gameTitle);
    const gameTitleText = gameTitle.textContent.trim();
    var url =
      "https://api.rawg.io/api/games?key=" +
      apiKey +
      "&search=" +
      gameTitleText;
    console.log(url);

    try {
    const response = await fetch(url);
    const gameData = await response.json();
    console.log(gameData);
      if (
        gameData.results &&
        gameData.results.length > 0 &&
        gameData.results[0].esrb_rating
      ) {
        battlefield4ESRB.textContent = gameData.results[0].esrb_rating.name;
      } else {
        battlefield4ESRB.textContent = "ESRB rating not available";
      }
    } catch (error) {
        console.error("Fetch error", error);
    }
  }
  gameInfo(gameTitle, apiKey, battlefield4ESRB);
});
