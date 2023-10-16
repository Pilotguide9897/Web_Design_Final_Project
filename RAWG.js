document.addEventListener("DOMContentLoaded", (event) => {
  const gameTitle = document.getElementById("masterpiece1");
  const apiKey = "7f48b16c6de34092abdc24716b96cdad";
  var battlefield4ESRB = document.getElementById("battlefield4ESRB");
  var battlefield4Metacritic = document.getElementById(
    "battlefield4Metacritic"
  );
  var battlefield4Genres = document.getElementById("battlefield4Genres");
  var battlefield4Platforms = document.getElementById("battlefield4Platforms");
  console.log(battlefield4Platforms);

  async function gameInfo(
    gameTitle,
    apiKey,
    battlefield4ESRB,
    battlefield4Metacritic,
    battlefield4Platforms,
    battlefield4Genres
  ) {
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

      // ESRB Rating
      if (
        gameData.results &&
        gameData.results.length > 0 &&
        gameData.results[0].esrb_rating
      ) {
        battlefield4ESRB.textContent =
          "ESRB Rating: " + gameData.results[0].esrb_rating.name;
      } else {
        battlefield4ESRB.textContent = "ESRB: Rating not available";
      }

      // Metacritic Score
      if (
        gameData.results &&
        gameData.results.length > 0 &&
        gameData.results[0].metacritic
      ) {
        battlefield4Metacritic.textContent =
          "Metacritic Score: " + gameData.results[0].metacritic;
      } else {
        battlefield4Metacritic.textContent = "Metacritic: Score not available";
      }

      // Platforms
      console.log("battlefield4Platforms:", battlefield4Platforms);
      if (
        gameData.results &&
        gameData.results.length > 0 &&
        gameData.results[0].platforms
      ) {
        let platformNames = [];
        gameData.results[0].platforms.forEach((platformData) => {
          if (platformData.platform && platformData.platform.name) {
            platformNames.push(platformData.platform.name);
          }
        });
        let platformString = platformNames.join(", ");
        battlefield4Platforms.textContent = "Platform(s): " + platformString;
      } else {
        battlefield4Metacritic.textContent =
          "Platform(s): Platforms not available";
      }

      // Genres
      console.log("battlefield4Genres: ", battlefield4Genres);
      if (
        gameData.results &&
        gameData.results.length > 0 &&
        gameData.results[0].genres
      ) {
        let genreNames = [];
        gameData.results[0].genres.forEach((genreData) => {
          if (genreData.name) {
            genreNames.push(genreData.name);
          }
        });
        let genreString = genreNames.join(", ");
        console.log("genre string: " + genreString);
        battlefield4Genres.textContent = "Genre(s): " + genreString; // Returning nothing...
      } else {
        battlefield4Genres.textContent = "Genre(s): Genres not available";
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  }
  gameInfo(
    gameTitle,
    apiKey,
    battlefield4ESRB,
    battlefield4Metacritic,
    battlefield4Platforms,
    battlefield4Genres
  );
});
