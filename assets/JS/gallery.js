//Initial array of games
var games = [
    "WOW",
    "Fortnite",
    "Call of Duty",
    "Tetris",
    "Mario"
  ];
  // var gameName = $(this).attr("data-name");
  
  $(".game").on("click", giphy);
  
  // Function for displaying games data
  function renderButtons() {
    //   $("#button-view").empty();
    $(".button").empty();
  
    //Looping through the array of games
    for (var i = 0; i < games.length; i++) {
      // Then dynamicaly generating buttons for each game in the array
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of game to our button
      a.addClass("game btn btn-info");
      // Adding a data-attribute
      a.attr("data-person", games[i]);
      a.attr("id", games[i]);
      // Providing the initial button text
      a.text(games[i]);
      // Adding the button to the HTML
      $(".button").append(a);
    }
  }
  // This function handles events where one button is clicked
  $("#add-game").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    $("#message").empty();
    // This line grabs the input from the textbox
    var game = $("#game-input")
      .val()
      .trim();
    if (games.indexOf(game) === -1) {
      // Adding the game from the textbox to our array
      games.push(game);
      // Calling renderButtons which handles the processing of our games array
      renderButtons();
    } else {
      $("#message").append("<p>" + game + " button already exists</p>");
    }
    // Event listener for all button elements
    $(".game").on("click", giphy);
  });
  
  function giphy() {
    // In this case, the "this" keyword refers to the button that was clicked
    $("#gifs-appear-here").empty();
    var person = $(this).attr("id");
    //This is our API Key
    var APIKey = "&api_key=sW2GsLHMXqF4kknszQzsikLcoqyh7aRR"; 
    // Example queryURL for Giphy API
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + person + "&" + APIKey;
  
    console.log(person);
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      // Storing an array of results in the results variable
      var results = response.data;
      // Looping through each result item
      for (var i = 0; i < 10; i++) {
        // Creating and storing a div tag
        var personDiv = $("<span style='float: left'>");
        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Creating and storing an image tag
        var personImage = $("<img>");
        personImage.addClass("images");
        // Setting the src attribute of the image to a property pulled off the result item
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-state", "still");
        // Appending the paragraph and image tag to the animalDiv
  
        personDiv.append(p);
        personDiv.append(personImage);
        // Prependng the personDiv to the HTML page in the "#gifs-appear-here" div
  
        $("#gifs-appear-here").prepend(personDiv);
      }
      $(".images").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  }
  