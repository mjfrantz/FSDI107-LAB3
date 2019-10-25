
//Object Constructor
function Item(title, description, price, image, category){
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
    this.user = "Mike";
}

function saveItem() {
    //get data 
    var title = $("#titleTxt").val();
    var description = $("#descriptionTxt").val();
    var price = $("#priceTxt").val();
    var image = $("#imageTxt").val();
    var category = $("#selCategory").val();

    console.log(title, description, price, image, category);

    // create object 
    var theItem = new Item(title, description, price, image, category);
    console.log(theItem);
    //Read the obj
    console.log("the title: ", theItem.title)
    
    //save object to backend
    var serverURL = "http://127.0.0.1:8080/api/products"
    $.ajax({
        url: serverURL,
        type: "POST",
        data: JSON.stringify(theItem),
        contentType: "application/json",
        success:function(res){
            console.log("Req successful", res);
        },
        error:function(error){
            console.error("Error on req", error);
        }
    });
}

function testAjax(){
    var serverURL = "http://restclass.azurewebsites.net/API/test";

    $.ajax({
        url:serverURL,
        type:"GET",
        success:function(res){
            console.log("Req successful", res);
        },
        error:function(error){
            console.error("Error on req", error);
        }
    });
}

function init(){
    console.log("Init");

    //initializations 

    //events
    $("#btnSave").click(saveItem);
}

window.onload = init;