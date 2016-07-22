window.onload = function() {

/***************************INIT STUFF*****************************************/
  var searchBox           = document.getElementById('search-box');
  var searchBoxDiv        = document.getElementById('search-box-div');
  var searchBtn           = document.getElementById('search-glass');
  var backgrounds         = document.getElementById('backgrounds');
  var backgrounds2        = document.getElementById('backgrounds2');
  var results             = document.getElementById("results");
  var body                = document.getElementById("body");
  var right               = document.getElementById("right");
  var home                = document.getElementById("home");
  var favsPlace           = document.getElementById("favs-place");
  var favsImage           = document.getElementById("favs-image");
  var favsPlaceClear      = document.getElementById("favs-place-clear");
  var favsImageClear      = document.getElementById("favs-image-clear");
  var nameContainer       = document.getElementById("results-name");
  var tempContainer       = document.getElementById("results-temp");
  var flexMain            = document.getElementById("flex-main");
  var card                = document.getElementById("card-id");
  var views               = document.getElementById("view-id");
  var imgContainer;
  var placeSearch;
  var tempData = {};
  var highestLikes = 0;
  var highestLikesUrl = "";
  var highestFavs = 0;
  var highestFavsUrl = "";
  var url = 'http://localhost:3000';
  var locatName;

  function hide(){
    results.style.display = "none";
    results.innerHTML = "";
    backgrounds.innerHTML = "";
    nameContainer.innerHTML = "";
    tempContainer.innerHTML = "";
    flexMain.innerHTML = "";
    backgrounds.style.display = "none";
    backgrounds2.innerHTML = "";
    backgrounds.innerHTML = "";
  }
  function show(){
    results.style.display = "flex";
    backgrounds.style.display = "flex";
  }
  function set_background(childImg){
    var reg = "linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var moz = "-moz-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var webkit = "-webkit-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var ms = "-ms-linear-gradient(to top, rgba(186, 186, 186, 0.47), rgba(86, 86, 86, 0.7)), ";
    var second = "url("+childImg+")"
    right.style.background=reg + second;
    right.style.background=moz + second;
    right.style.background=webkit + second;
    right.style.background=ms + second;
    right.style.backgroundSize="cover, cover";
    right.style.backgroundPosition = "center, center";
    right.style.backgroundRepeat = "no-repeat, repeat";
    right.style.backgroundAttachment = "fixed"
  }
  home.addEventListener("click", function(ev){
    ev.preventDefault();
    location.reload();
  })
  favsImageClear.addEventListener("click", function(ev){
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y"){
      console.log("AJAX CALL ################## DELETE IMAGES ALL #######################");
      $.ajax({
        url: url + '/images/',
        method: 'DELETE',
        dataType: 'json'
      }).done(function(response) {
        console.log("RESPONSE FROM DELETE IMAGES ALL:", response);
        display(response);
      }); // end ajax
    }
  })
  favsPlaceClear.addEventListener("click", function(ev){
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y"){
      console.log("AJAX CALL ################## DELETE PLACES ALL #######################");
      $.ajax({
        url: url + '/places/',
        method: 'DELETE',
        dataType: 'json'
      }).done(function(response) {
        console.log("RESPONSE FROM DELETE PLACES ALL:", response);
        display(response);
      }); // end ajax
    }
  })

/***************************END INIT STUFF*************************************/

//displays fav weather
function displayFavPlace(response){
  document.querySelectorAll("#img-containerID").innerHTML = "hi";


  console.log("IN DISPLAY FAV PLACE","RESPONSE PASSED IN", response);
  hide();
  show();
  set_background("back2.jpg");
    var resLen = response.length;
    var resI;
    for(var i = 0; i < resLen; i++){
      resI = response[i];
      for(var key in resI){
        switch (key) {
          case "name":
            var name = resI[key];
            var card = document.createElement('div')
            var p = document.createElement('p');
            var view = document.createElement("button");
            p.innerHTML = name;
            p.id="p-id";
            card.appendChild(p);
            view.id = "view-id";
            view.innerText = "view this place";
            card.id = "card-id"
            card.appendChild(view);
            results.appendChild(card);

            view.addEventListener("click", function(e){
              e.preventDefault();
              var parent = $(this).parent();
              var text = parent[0].children[0].childNodes[0].data
              tempData = {
                queryString: text
              };

              console.log("td", tempData);
              console.log("AJAX CALL ################## POST PLACES/SEARCH #######################");
              console.log("DATA to POST:", tempData);
              $.ajax({
                url: url + '/places/search',
                method: 'POST',
                data: tempData,
                dataType: 'json'
              }).done(function(response) {
                console.log("RESPONSE FROM POST PLACES/SEARCH:", response);
                display(response);
              }); // end ajax

              console.log("AJAX CALL ################## POST IMAGES/SEARCH #######################");
              console.log("DATA to POST:", tempData);
              $.ajax({
                url: url + '/images/search',
                method: 'POST',
                data: tempData,
                dataType: 'json'
              }).done(function(response) {
                console.log("RESPONSE FROM POST IMAGES/SEARCH:", response);
                determineBackground(response);
              }); // end ajax
            })

            var remove = document.createElement("button");
            remove.id = "delete-id";
            remove.innerText = "delete";
            card.appendChild(remove);
            results.appendChild(card);

            remove.addEventListener("click", function(){
              var parent = $(this).parent();
              console.log("parent in remove", parent);
              locatName = parent[0].children[0].innerText;

              console.log(locatName);
              var dataPlace = {
                name: locatName
              }
              console.log("AJAX CALL ################## DELETE PLACES/FAVORITES #######################");
              console.log("DATA to DELETE:", dataPlace);
              $.ajax({
                url: url + '/places/favorites',
                method: 'DELETE',
                data: dataPlace,
                dataType: 'json'
              }).done(function(response) {
                console.log("RESPONSE FROM DELETE PLACES/FAVORITES:", response);
              }); // end ajax
            });


            var update = document.createElement("button");
            update.id = "update-id";
            update.innerText = "upate";
            card.appendChild(update);
            results.appendChild(card);

            update.addEventListener("click", function(){
              var parent = $(this).parent();
              console.log("parent in remove", parent);
            });

            console.log("AJAX CALL ################## POST IMAGES/SEARCH #######################");
            $.ajax({
              url: url + '/images/search',
              method: 'POST',
              data: tempData,
              dataType: 'json'
            }).done(function(response) {
              console.log("IN TEMP AJAX IMAGES");
              console.log("RESPONSE FROM POST IMAGES/SEARCH:", response);
              determineBackground(response);
            }); // end ajax

            break;
          default:

        }
      }
    }
}

//displays weather
function display(response){
  hide();
  show();
  for(var key in response){    switch (key) {
      case "main":        var main = document.createElement('div');
        main.innerHTML = "<b>Main:</b>";
        main.id="mainid";        results.appendChild(main);
        var outerIndex = response[key];
          for(var inner in outerIndex){
            switch (inner) {
              case "temp":
                main.innerHTML+="Temperature is: " + outerIndex[inner] + "˚<br>";
                var temp = document.createElement("div");
                temp.id = "tempid";
                temp.innerHTML=outerIndex[inner] + "˚";
                tempContainer.appendChild(temp);
                flexMain.appendChild(tempContainer);
                results.appendChild(flexMain);
                break;
              case "temp_max":
                main.innerHTML+="Max Temperature: " + outerIndex[inner] + "˚<br>";
                break;
              case "temp_min":
                main.innerHTML+="Min Temperature: " + outerIndex[inner] + "˚<br>";
                break;
              case "humidity":
                main.innerHTML+="Humidity: " + outerIndex[inner] + "˚<br>";
                console.log("43 main is now", main);
                break;
              default:
                break;
            } //end switch
          } //end for
        break;

      case "name":
        var name = document.createElement('div');
        name.id="nameid";
        nameContainer.appendChild(name);
        flexMain.appendChild(nameContainer);
        results.appendChild(flexMain);
        name.innerHTML +=response[key];
        var add = document.createElement("button");
        add.id = "addWeather";
        add.className="glyphicon glyphicon-heart";
        add.innerText = "Favorite"
        flexMain.appendChild(add);

        add.addEventListener("click", function(){
          var parent = $(this).parent();
          locatName = parent[0].children[1].children[0].childNodes[0].data;

          var dataPlace = {
            name: locatName
          }
          console.log("AJAX CALL ################## POST PLACES/FAVORITES #######################");
          $.ajax({
            url: url + '/places/favorites',
            method: 'POST',
            data: dataPlace,
            dataType: 'json'
          }).done(function(response) {
            console.log("RESPONSE FROM POST PLACES/FAVORITES:", response);
          }); // end ajax
        }); // end add btn
        break;

      case "weather":
        var weather = document.createElement('div');
        weather.innerHTML = "<br>"+"<b>"+ "Description" + ":</b><br>";
        results.appendChild(weather);
        weather.id="weatherid";
        var outerIndex = response[key];
        var innerIndex = outerIndex[0];
          for(var inner in innerIndex){
            switch (inner) {
              case "description":
                  weather.innerHTML+=innerIndex[inner] + "<br>";
                break;
              default:
                break;
            } //end switch
          } //end for
        break; //end case weather
      default:
        break;
    } //end switch
  } //end for in loop
} //end function




















/***************************FUNCTIONS******************************************/

  function determineBackground(response){
    set_background("back2.jpg");
    backgrounds.innerHTML = "";
    console.log("#########DETERMINING BACKGROUND###########");
    console.log("#RESPONSE", response, "#");
    console.log("#CHECK IF RESPONSE IS FAVORITED ITEM#");
    if(!response.hits || response.hits <1){
      console.log("#IT IS A FAVORITED ITEM");
    }
    else{
      var resHits = response.hits;
      var resHitsLen = resHits.length;
      highestLikes = 0;
      highestFavs = 0;
      if(response.totalHits < 1){
        backgrounds.innerHTML = "SORRY THERE ARE NO IMAGES WITH THAT CRITERIA, TRY AGAIN..."
      }
      else{
        for(var i = 0; i < resHitsLen; i++){
          if(resHits[i].likes > highestLikes){
            highestLikes = resHits[i].likes;
            highestLikesUrl = resHits[i].webformatURL;
          }
          if(resHits[i].favorites > highestFavs){
            highestFavs = resHits[i].favorites;
            highestFavsUrl = resHits[i].webformatURL;
          }

          var imgContainer = document.createElement('div');
          imgContainer.id="img-containerID"
          backgrounds.appendChild(imgContainer)

          var img = document.createElement('img');
          var pic = resHits[i].webformatURL;
          img.src = pic;
          img.id = "img-id";

          var button = document.createElement("button");
          button.id = "makeBack";
          button.className = "glyphicon glyphicon-plus"
          button.innerText = "Back"

          var add = document.createElement("button");
          add.id = "add";
          add.className="glyphicon glyphicon-heart";
          add.innerText = "Fav"

          imgContainer.appendChild(img);
          imgContainer.appendChild(button);
          imgContainer.appendChild(add);

          button.addEventListener("click", function(){
            console.log("BACKGROUND BUTTON WAS PRESSED");
            var parent = $(this).parent();
            var childImg = parent[0].children[0].src;
            set_background(childImg);
          }) //button listener

          add.addEventListener("click", function(){
            var parent = $(this).parent();
            var dataImg = parent[0].children[0].currentSrc;
            var data= {
              imgURL: dataImg
            }
            console.log("AJAX CALL ################## POST IMAGES/FAVORITES #######################");
            $.ajax({
              url: url + '/images/favorites',
              method: 'POST',
              data: data,
              dataType: 'json'
            }).done(function(response) {
              console.log("RESPONSE FROM POST IMAGES/FAVORITES:", response);
            }); // end ajax
          }); // end add btn

        } //end for loop
        set_background(highestLikesUrl);

      }//end else
    }

  } //end funx


  function displayFavImages(response){
    hide();
    show();
    console.log("IN DISPLAY FAV IMAGES");
    console.log("RES", response);
    var resLen = response.length;
    for(var i = 0; i < resLen; i++){
      console.log("i is", i);
      var resKey = response[i];
      for(var key in response[i]){
        if(key == "imgURL"){
          console.log("reskey[key]", resKey[key]);
          var imgContainer = document.createElement('div');
          imgContainer.id="img-containerID"
          backgrounds.appendChild(imgContainer)

          var img = document.createElement('img');
          var pic = resKey[key];
          img.src = pic;
          img.id = "img-id";

          var button = document.createElement("button");
          button.id = "makeBack";
          button.className = "glyphicon glyphicon-plus"
          button.innerText = "make back";

          var remove = document.createElement("button");
          remove.id = "delete";
          remove.className="glyphicon glyphicon-delete";
          remove.innerText = "delete"

          var update = document.createElement("button");
          update.id = "update";
          update.className="glyphicon glyphicon-edit";
          update.innerText = "update, add comment"

          imgContainer.appendChild(img);
          imgContainer.appendChild(button);
          imgContainer.appendChild(remove);
          imgContainer.appendChild(update);

          button.addEventListener("click", function(){
            console.log("BACKGROUND BUTTON WAS PRESSED");
            var parent = $(this).parent();
            var childImg = parent[0].children[0].src;
            set_background(childImg);
          }) //button listener

          remove.addEventListener("click", function(){
            var parent = $(this).parent();
            console.log("parent", parent);
            var dataImg = parent[0].children[0].currentSrc;
            var data= {
              imgURL: dataImg
            }

            console.log("AJAX CALL ################## DELETE IMAGES/FAVORITES #######################");
            $.ajax({
              url: url + '/images/favorites',
              method: 'DELETE',
              data: data,
              dataType: 'json'
            }).done(function(response) {
              console.log("RESPONSE FROM DELETE IMAGES/FAVORITES:", response);
            }); // end ajax
          }); // end add btn
        }
      }
    }
  }
/**************************END OF FUNCTIONS************************************/




























/**************************EVENT LISTENERS/BUTTONS*****************************/
  searchBtn.addEventListener('click', function(ev) {
    hide();
    show();
    ev.preventDefault();

    placeSearch = searchBox.value;

    var data = {
      queryString: placeSearch
    };

    console.log("AJAX CALL ################## POST PLACES/SEARCH #######################");
    $.ajax({
      url: url + '/places/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST PLACES/SEARCH:", response);
      display(response);
    }); // end ajax

    console.log("AJAX CALL ################## POST IMAGES/SEARCH #######################");
    $.ajax({
      url: url + '/images/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST IMAGES/SEARCH:", response);
      determineBackground(response);
    }); // end ajax
  }); // end search btn


  favsImage.addEventListener("click", function(ev){
    console.log("########FAV IMAGES##############");
    ev.preventDefault();

    console.log("AJAX CALL ################## GET IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM GET IMAGES/FAVORITES:", response);
      displayFavImages(response);
    }); // end ajax
  })

  favsPlace.addEventListener("click", function(ev){
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("FAV PLACES PRESSED");
    set_background("back2.jpg");

    ev.preventDefault();

    console.log("AJAX CALL ################## GET PLACES/FAVORITES #######################");
    $.ajax({
      url: url + '/places/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM GET PLACES/FAVORITES:", response);
      set_background("back2.jpg");
      console.log("CALLING DISPLAY FAV PLACE");
      displayFavPlace(response);
    }); // end ajax
  })


/***********************END EVENT LISTENERS/BUTTONS****************************/
































/**************************EXECUTION*******************************************/
  hide();
/**************************END OF EXECUTION************************************/

}; // end window onload fxn
