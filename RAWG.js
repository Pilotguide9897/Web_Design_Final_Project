document.addEventListener("DOMContentLoaded", (event) => {
  const gameCards = document.querySelectorAll(".gameCard");
  const apiKey = "7f48b16c6de34092abdc24716b96cdad";
  console.log("Hello! For one of our wow factors, notice how the ESRB, Genre, Platform, and Metacritic scores on the category pages are all dynamically generated with the results of an api call to a gaming database."); 

  async function gameInfo(card) {
    const gameTitleElement = card.querySelector("h2");
    gameTitleText = gameTitleElement.textContent.trim();
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${gameTitleText}`;

    try {
      const response = await fetch(url);
      const gameData = await response.json();
      console.log(gameData);

      // ESRB Rating
      if (gameData.results && gameData.results.length > 0) {
        const game = gameData.results[0];

        const esrb = card.querySelector(".esrb");
        if (game.esrb_rating) {
          esrb.textContent = "ESRB Rating: " + game.esrb_rating.name;
        } else {
          esrb.textContent = "ESRB: Rating not available";
        }

        // Metacritic Score
        const metacritic = card.querySelector(".metacritic");
        if (game.metacritic) {
          metacritic.textContent = "Metacritic Score: " + game.metacritic;
        } else {
          metacritic.textContent = "Metacritic Score: Unavailable";
        }

        // Platforms
        const platforms = card.querySelector(".platforms");
        if (game.platforms) {
          let platformNames = [];
          game.platforms.forEach((platformData) => {
            if (platformData.platform && platformData.platform.name) {
              platformNames.push(platformData.platform.name);
            }
          });
          let platformString = platformNames.join(", ");
          platforms.textContent = "Platform(s): " + platformString;
        } else {
          platforms.textContent = "Platform(s): Platforms not available";
        }

        // Genres
        const genres = card.querySelector(".genres");
        if (game.genres) {
          let genreNames = [];
          game.genres.forEach((genreData) => {
            if (genreData.name) {
              genreNames.push(genreData.name);
            }
          });
          let genreString = genreNames.join(", ");
          console.log("genre string: " + genreString);
          genres.textContent = "Genre(s): " + genreString;
        } else {
          genres.textContent = "Genre(s): Genres not available";
        }
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  }
  gameCards.forEach((card) => {
    gameInfo(card);
  });
});
