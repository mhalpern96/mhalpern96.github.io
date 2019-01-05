//set topics
$(document).ready(function(){
var topics = ["Falcon 9","Atlas V", "HII-A", "OATK Anteres-230", "BO New Sheppard", "Delta IV"];
// borrowed from movie buttons example
function renderButtons(){

    $("#topics-view").empty();
 for (i=0; i < topics.length; i++){
    var a = $("<button>");
    a.addClass("topic");
    a.addClass("btn");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#topics-view").append(a);
 };

};
//listen for submit and add button
$("#add-topic").on("click",function(event) {
    event.preventDefault();
    var topic = $("#topicsInput").val().trim();
    topics.push(topic);
    renderButtons();
});
//rend btn at least once
renderButtons();
//btn click handle
$(document).on("click",'.topic',function(){
//$(".topic").on("click",function(){
    $("#images").empty();
var name = $(this).data("name");
console.log(name);
//get images from giphy
var xhr = $.get("https://cors.io/?https://api.giphy.com/v1/gifs/search?q="+ name + "&api_key=WHqh7w7DEBAvxr73OzKUIhesiCXQiZIR&limit=10");
xhr.done(function(data){
//render images
	data = data.replace(/\\/gi, '');
	data = JSON.parse(data);
    for (i=0; i < data.data.length; i++){
    var gifDiv = $("<div class='item'>");
   gifDiv.addClass("btn")
   gifDiv.addClass("image")
    //var state = still;
    
    var rating = data.data[i].rating;
    var p = $("<p>").text("Rating: " + rating);
  var still =   data.data[i].images.fixed_height_still.url; 
  var moving = data.data[i].images.fixed_height.url; 
    
    var img = $('<img />', {
        class: 'gallery', 
        src: still,

        
    });
    img.attr("data-state", "still");
    img.attr("data-still", still);
    img.attr("data-moving", moving);

    gifDiv.append(img);
    gifDiv.append(p);
    gifDiv.attr("data-index",i);
    $("#images").append(gifDiv);
}

});
});
//listen for click on images
$(document).on("click",'.gallery',function(){
      var state = $(this).data("state");
      var still = $(this).data("still");
      var moving = $(this).data("moving");
      //check state switch image
      if (state === "still"){
         $(this).data("state", "moving");
         $(this).attr('src', moving);
      } else {
        $(this).data("state", "still");
        $(this).attr('src', still);
        }
});
//$(".gifdiv").on("click",function(){
  //  var state = $(this).attr("state");
//    if (state === "still"){
 //       $(this).attr("state", moving);
  //      $(this).img.src = $(this).moving;
      //  $(this).state = moving;
       // console.log("move")
    }
  //  else {
    //    $(this).attr("state", still);
 //       $(this).img.src = $(this).still;
     //   $(this).state = still;
       // console.log("still")
    //}
    
//});
//});
);