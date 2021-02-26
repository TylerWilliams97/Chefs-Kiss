$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
// Onclick function to post recipe
const postButton = document.querySelector("#postButton")
const 
document.getElementById("postButton").addEventListener("click", function(){

});

function clickPost() {
  document.getElementById("postButton").innerHTML = "";
  // -----------------------------------------------^insert function above
}
