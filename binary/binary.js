//var OriginArray = [1,2,5,4,9,10,25,42,64,70,77,81,93,101,104];
var OriginArray = ["apple","bannana","coconut","fig","licorish","mango","peach"];

function Chopping(x, array, min, max){
    //finds mid point in search range
    var split = (((max+1)-min)/2 >> 0) + min;
   
     if (array[split] == x){
       // returns position of target vallue in array
        return(split);

     }else if (max - min <= 1){
         //  returns error if value isn't found
            return("value not in array");
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
    if (array.includes(NaN)){
        array.sort();
    }else{
        array.sort((a,b) => a-b);
    }

    //sets initial search parameters
    
    var min = -1;
    var max = (array.length)- 1;
    return(Chopping(x, array, min, max));
    
};

console.log(Chop("fig",OriginArray));
