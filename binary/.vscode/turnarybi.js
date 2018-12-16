var OriginArray = [1,2,4,9,10,25,42,64,70,77,81,93,101,104];

function Chop(x, array){
    // checks if array has numbers and sorts array
    array.includes(NaN)? array.sort():  array.sort((a,b) => a-b);
    

    //sets initial search parameters
    
    var min = -1;
    var max = (array.length)- 1;
    return(Chopping(x, array, min, max));
    
};

