// document.addEventListener( "DOMContentLoaded", getData, false );


document.addEventListener( "DOMContentLoaded", createTable, false );


current_page =1;
document.addEventListener( "DOMContentLoaded", function() {
    getData(current_page);
  });

document.getElementById("Previous").addEventListener("click", function() {
  calculatePage(-1);
});


document.getElementById("Next").addEventListener("click", function() {
  calculatePage(1);
});

// first create a TABLE structure by adding few headers.
function createTable() {
    arrHead = new Array();
    arrHead = ['Planet Name', 'Climate', 'Diameter', 'Terrain', 'Population'];
    var planetTable = document.createElement('table');
    planetTable.setAttribute('id', 'planetTable');  // table id.

    var tr = planetTable.insertRow(-1);
    
    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); 
        th.innerHTML = arrHead[h];
        tr.appendChild(th);
    }

    var div = document.getElementById('cont');
    div.appendChild(planetTable);    
}


function getData(current_page){
    // console.log(typeof current_page);
    var num_str = current_page.toString();
    // console.log(typeof num_str);
    var url = '/?page=' + num_str
    fetch(url)
    .then((response)=> response.json())
    .then(planets=>{
        console.log(planets['results']);
        append_json(planets['results']);
    })
}

function DeleteRows() {
    var rowCount = planetTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        planetTable.deleteRow(i);
    }
}
    

function append_json(planets){
    
    DeleteRows();
   
    planets.forEach(function(planet) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + planet.name + '</td>' +
        '<td>' + planet.climate + '</td>' +
        '<td>' + planet.diameter + '</td>' +
        '<td>' + planet.terrain + '</td>' +
        '<td>' + planet.population + '</td>' ;
        planetTable.appendChild(tr);
    
    });
}


function calculatePage(delta){
    console.log(current_page);
    if((current_page ==1 && delta ==-1) || (current_page  ==6 && delta == 1)){
        getData(current_page);
    }
    else{
        current_page  = current_page  + delta;
        getData(current_page );
    }
}