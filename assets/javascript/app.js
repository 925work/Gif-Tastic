var buttons = ["Hamburger", "Spaghetti", "Fries", "Corn dogs"];
//clears and re-renders button function
renderButtons();

function renderButtons(){
    $(".buttonsContainer").empty();
    for(var i = 0; i < buttons.length; i++){
        var a = $('<button>');
        a.addClass("btn btn-secondary ml-1 mr-1 mt-1 mb-1 button-btn");
        a.attr("data-subject", buttons[i]);
        a.text(buttons[i]);
        $(".buttonsContainer").append(a);
    }
}

$("#searchButton").on("click", function(event){
    event.preventDefault();
    var search = $("#search").val().trim();
    buttons.push(search);
    renderButtons();
});

// Creating an AJAX call for the specific button being clicked
function displayGifs(){
    var button = $(this).attr("data-subject");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        button + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var buttonDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var buttonImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          buttonImage.attr("src", results[i].images.fixed_height.url);
          buttonImage.attr("data-still", results[i].images.fixed_height_still.url);
          buttonImage.attr("data-animate", results[i].images.fixed_height.url);
          buttonImage.attr("data-state", "animate");
          buttonImage.addClass("gif");
          // Appending the paragraph and image tag to the buttonDiv
          buttonDiv.append(p);
          buttonDiv.append(buttonImage);

          // Prependng the buttonDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(buttonDiv);

          
        }
      });
}
$(document).on("click", ".gif", function(){
  var state = $(this).attr("data-state");
  if (state == "animate") {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
})

$(document).on("click", ".button-btn", displayGifs);
//prepends gifs to screen

//gifs stop function