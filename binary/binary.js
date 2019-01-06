$(document).ready(function(){
var NumArray = [1,2,5,4,9,10,25,42,64,70,77,81,93,101,104];
var AlphaArray = ["apple","bannana","coconut","fig","licorish","mango","peach"];
var Arrays = [NumArray, AlphaArray];

renderButtons();

  
function renderButtons(){
    
    $("#array-view").empty();
 for (i=0; i < Arrays.length; i++){
    var a = $("<button>");
    a.addClass("array");
    a.addClass("btn");
    a.attr("data-name", JSON.stringify(Arrays[i]));
    a.text(JSON.stringify(Arrays[i]));
    $("#array-view").append(a);
    $("#array-view").append('&nbsp;');
 };

};
//var searchTarget = 1
//$("#search").on("click",function(event) {
  //  event.preventDefault();
  
    
    
//});


$(document).on("click",'.array',function(){
    var text =   this.innerText 
var array= JSON.parse( text );
var searchTarget = $("#searchInput").val().trim();
    result = Chop(searchTarget,array)  ;
    if (result < 0){
        result = "value not in array";
    }else{
        result++;
    };
    
    var p = $("<p>").text("sorted possition: " + result );
    $("#arraysorted").empty(); 
    $("#arraysorted").append(JSON.stringify(array));
    $("#arraysorted").append(p);
});


function Chopping(x, array, min, max){
    //finds mid point in search range
    var split = (((max+1)-min)/2 >> 0) + min;
   
     if (array[split] == x){
       // returns position of target vallue in array
        return(split);

     }else if (max - min <= 1){
         //  returns error if value isn't found
            return(-1);
    }else if(array[split] > x){
       // moves max to search mid point if value is greater than target
      return(Chopping(x, array, min, split));

    }else{
        //moves min to search mid point if value is less than target
        return(Chopping(x, array, split, max));
    };
   
};
function Chop(x, array){
    // checks if array has numbers and sorts array
    if (array.some(isNaN)){
        array.sort();
    }else{
        array.sort((a,b) => a-b);
    }

    //sets initial search parameters
    
    var min = -1;
    var max = (array.length)- 1;
    return(Chopping(x, array, min, max));
    
};
});
//console.log(Chop("fig",OriginArray));
