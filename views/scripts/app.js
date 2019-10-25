

var catalog = [];

function getCatalog () {
    var serverURL = "http://127.0.0.1:8080/api/products"
    $.ajax({
        url: serverURL,
        type: "GET",
        success: function (res) {
            console.log("Req successful", res);

            for(let i =0; i < res.length; i++){
                var item = res[i];
                if(item.user == "Mike"){
                    catalog.push(item); //append to catalog
                }
            }
            displayCatalog();
        },
        error:function(error){
            console.error("Error on req", error);
        }
    });
}

function displayCatalog () {
    //for every item on the catalog array,
    for(let i=0; i<catalog.length; i++){
        var item = catalog[i];
        displayItem(item);
     }
}

function displayItem(item){
    //get the reference to ul
    var ul = $("#catalog");

    //create an LI
    var li = 
    `<div class="card" style="width: 18rem;">
        <img src="${item.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <p class="card-text">${item.description}</p>
            <h6>${item.price}</h6>
            <a href="#" class="btn btn-primary">Add to cart</a>
        </div>
    </div>`;
    //add the li to UL
    ul.append(li);
}

function search () {
    var text = $("#txtSearch").val().toLowerCase();

    $("#catalog").html(' ');
    for(let i =0; i < catalog.length; i++){
        var item = catalog[i];

        if(item.title.toLowerCase().indexOf(text) >= 0
        || item.description.toLowerCase().indexOf(text) >= 0){
            displayItem(item);
        }
    }
}

function init() {
    console.log("hi");
    // initalizing 
    getCatalog();
    //events 
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function(arg){
        if(arg.keyCode == 13) {
           search();

            arg.preventDefault(); //prevent page to refresh
        }
    })
    
}

window.onload = init;