window.onload = function() {

/***************************INIT STUFF*****************************************/
  var searchBox           = document.getElementById('search-box');
  var searchBoxDiv        = document.getElementById('search-box-div');
  var searchBtn           = document.getElementById('search-glass');
  var allImages           = document.getElementById('allImages');
  var favImages           = document.getElementById('favImages');
  var favPlaces           = document.getElementById('favPlaces');
  var allPlaces           = document.getElementById("allPlaces");
  var body                = document.getElementById("body");
  var right               = document.getElementById("right");
  var home                = document.getElementById("home");
  var favsPlace           = document.getElementById("favs-place");
  var favsImage           = document.getElementById("favs-image");
  var favsPlaceClear      = document.getElementById("favs-place-clear");
  var favsImageClear      = document.getElementById("favs-image-clear");
  var nameContainer       = document.getElementById("results-name");
  var tempContainer       = document.getElementById("results-temp");
  var resultsDescript     = document.getElementById("results-description");
  var resultsMain         = document.getElementById("results-main");
  var flexMain            = document.getElementById("flex-main");
  var card                = document.getElementById("card-id");
  var views               = document.getElementById("view-id");
  var wrapper             = document.getElementById("wrapper");
  var imgContainer;
  var placeSearch;
  var tempData = {};
  var highestLikes = 0;
  var highestLikesUrl = "";
  var highestFavs = 0;
  var highestFavsUrl = "";
  var url = 'http://localhost:3000';
  var locatName;
  // var url = "https://morning-temple-77469.herokuapp.com/";

  //HIDE EVERYTHING
  function hideEverything(){
    hideAll();
    hideFavorites();
  }

  //ALL IMAGES/PLACES
  function hideAll(){
    hideAllPlaces();
    hideAllImages();
  }
  function hideAllPlaces(){
    allPlaces.style.display = "none";
  }
  function hideAllImages(){
    allImages.style.display = "none";
  }
  function showAll(){
    showAllPlaces();
    showAllImages();
  }
  function showAllPlaces(){
    allPlaces.style.display = "flex";
    allPlaces.innerHTML = "";
    resultsDescript.innerHTML = "";
    flexMain.innerHTML="";
    nameContainer.innerHTML = "";
    tempContainer.innerHTML = "";
    resultsMain.innerHTML = "";
  }
  function showAllImages(){
    allImages.innerHTML = "";
    allImages.style.display = "flex";
  }

  //FAVORITE IMAGES/PLACES
  function hideFavorites(){
    hideFavPlaces();
    hideFavImages();
  }
  function hideFavPlaces(){
    favPlaces.style.display = "none";
  }
  function hideFavImages(){
    favImages.style.display = "none";
  }
  function showFavorites(){
    favPlaces.innerHTML = "";
    favImages.innerHTML = "";
    favImages.style.display = "flex";
    favPlaces.style.display = "flex";
  }
  function showFavImages(){
    favImages.innerHTML="";
    favImages.style.display = "flex";
  }
  function showFavPlaces(){
    favPlaces.innerHTML = "";
    favPlaces.style.display = "flex";
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

/***************AJAX CALLS*****************/
  function put_places_favorites(data, upInputVal){
    console.log(url + '/places/favorites/' + upInputVal);
    $.ajax({
          url: url + '/places/favorites/' + upInputVal,
          dataType: 'json',
          method: 'put',
          data: data
        }).done(function(response){
             console.log("PUT RESPONSE", response);
       }); // end ajax
  }

  function post_places_search(data){
    console.log("AJAX CALL ################## POST PLACES/SEARCH #######################");
    $.ajax({
      url: url + '/places/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST PLACES/SEARCH:", response);
      displayAllPlaces(response);
    }); // end ajax
  }
  function post_places_favorites(data){
    console.log("AJAX CALL ################## POST PLACES/FAVORITES #######################");
    $.ajax({
      url: url + '/places/favorites',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST PLACES/FAVORITES:", response);
      get_places_favorites();
    }); // end ajax
  }

  function get_places_favorites(){
    set_background("back2.jpg");

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
  }

  function delete_places_favorites(data){
    console.log("AJAX CALL ################## DELETE PLACES/FAVORITES #######################");
    console.log("DATA to DELETE:", data);
    $.ajax({
      url: url + '/places/favorites',
      method: 'DELETE',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM DELETE PLACES/FAVORITES:", response);
    }); // end ajax
    location.reload();
    getFavPlaces();

  }
  function delete_places(){
    console.log("AJAX CALL ################## DELETE PLACES ALL #######################");
    $.ajax({
      url: url + '/places/',
      method: 'DELETE',
      dataType: 'json'
    });
  }

  function post_images_search(data){
    console.log("AJAX CALL ################## POST IMAGES/SEARCH #######################");
    console.log("DATA to POST:", data);
    $.ajax({
      url: url + '/images/search',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST IMAGES/SEARCH:", response);
      displayAllImages(response);
    }); // end ajax
  }
  function post_images_favorites(data){
    console.log("AJAX CALL ################## POST IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'POST',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM POST IMAGES/FAVORITES:", response);
    }); // end ajax
  }

  function get_images_favorites(){
    console.log("AJAX CALL ################## GET IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'GET',
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM GET IMAGES/FAVORITES:", response);
      displayFavImages(response);
    }); // end ajax
  }

  function delete_images(){
    console.log("AJAX CALL ################## DELETE IMAGES ALL #######################");
    $.ajax({
      url: url + '/images/',
      method: 'DELETE',
      dataType: 'json'
    });
  }
  function delete_images_favorites(data){
    console.log("AJAX CALL ################## DELETE IMAGES/FAVORITES #######################");
    $.ajax({
      url: url + '/images/favorites',
      method: 'DELETE',
      data: data,
      dataType: 'json'
    }).done(function(response) {
      console.log("RESPONSE FROM DELETE IMAGES/FAVORITES:", response);
    }); // end ajax
  }
/***************END AJAX CALLS*****************/

/*********************BUTTONS EVENT LISTENERS*************************/
  searchBtn.addEventListener('click', function(ev) {
    hideEverything();
    showAll();
    ev.preventDefault();

    placeSearch = searchBox.value;

    var data = {
      queryString: placeSearch
    };

    post_places_search(data);
    post_images_search(data);
  }); // end search btn

  home.addEventListener("click", function(ev){
    hideEverything();
    ev.preventDefault();
    location.reload();
  })

  favsImageClear.addEventListener("click", function(ev){
    hideEverything();
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y"){
      delete_images();
    }
  });
  favsPlaceClear.addEventListener("click", function(ev){
    hideEverything();
    showFavPlaces();
    ev.preventDefault();
    var permission = prompt("Are you sure you want to clear your favorite images? Y/N");
    if(permission.toLowerCase() == "y"){
      delete_places();
    }
  });

  //favsPlace.addEventListener
  //favsImage.addEventListener
/*********************END BUTTONS EVENT LISTENERS***********************/

/***********************FAV PLACE*************************/
favsPlace.addEventListener("click", function(ev){
  console.log("FAV PLACE PRESSED");
  ev.preventDefault();
  get_places_favorites();
  })

  function displayFavPlace(response){
    console.log("IN DISPLAY FAV PLACE","RESPONSE PASSED IN", response);
    hideFavImages();
    hideAllImages();
    hideAllPlaces();
    showFavPlaces();
    set_background("back2.jpg");
      var resLen = response.length;
      var resI;
      for(var i = 0; i < resLen; i++){
        resI = response[i];
        for(var key in resI){
          var outerCard = document.createElement("div");
          outerCard.id = "outerCardID";
          switch (key) {
            case "your_comment":
              var comment = resI[key];
              // var card = document.createElement('div')
              var cardComment = document.createElement('div');
                         cardComment.id = "commentID";
                         cardComment.innerHTML="Your Comment: " + comment;
                         card.appendChild(cardComment);
                         outerCard.appendChild(card);
                         console.log("outer", outerCard);
                         favPlaces.appendChild(outerCard);


              var update = document.createElement("button");

              break;

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
              favPlaces.appendChild(card);
              console.log("favPlaces", favPlaces);

              view.addEventListener("click", function(e){
                console.log("VIEW WAS PRESSED");
                e.preventDefault();
                var parent = $(this).parent();
                var text = parent[0].children[0].childNodes[0].data
                tempData = {
                  queryString: text
                };
                post_places_search(tempData);
                post_images_search(tempData);
              }); //end of view more

              var remove = document.createElement("button");
              remove.id = "delete-id";
              remove.innerText = "delete";
              card.appendChild(remove);
              favPlaces.appendChild(card);

              remove.addEventListener("click", function(){
                var parent = $(this).parent();
                console.log("parent in remove", parent);
                locatName = parent[0].children[0].childNodes[0].data;
                console.log(locatName);
                var dataPlace = {
                  name: locatName
                }
                delete_places_favorites(dataPlace);
              }); //end of remove/delete button


              var update = document.createElement("button");
              update.id = "update-id";
              update.innerText = "upate";
              card.appendChild(update);
              favPlaces.appendChild(card);

              update.addEventListener("click", function(e){
                console.log("UPDATE IN NAME WAS PRESSED");
                e.preventDefault();
                var parent = $(this).parent();
                var text = parent[0].children[0].childNodes[0].data
                tempData = {
                  queryString: text
                };
                console.log("TEMPDATA");
                var textArea = document.createElement("textarea");
                textArea.placeholder = "Please enter comment";
                card.appendChild(textArea);
                var submit = document.createElement("button");
                submit.innerText = "submit comment";
                card.appendChild(submit);
                submit.addEventListener("click", function(e){
                  e.preventDefault();
                  console.log("submit was pressed");
                  var textVal = textArea.value;
                  var data = {
                    name: text,
                    your_comment: textVal
                  }
                  console.log("data comment", data);
                  put_places_favorites(data, text);
                })
                //update method
                // post_places_search(tempData);
                // post_images_search(tempData);
              }); //end of update

              break;
            default:

          }
        }
      }
  }
/********************END OF FAV PLACE***********************/

/***********************FAV IMAGES*************************/
  favsImage.addEventListener("click", function(ev){
    console.log("########FAV IMAGES##############");
    ev.preventDefault();
    get_images_favorites();
  })

  function displayFavImages(response){
    hideAllImages();
    hideAllPlaces();
    hideFavPlaces();
    showFavImages();
    set_background("back2.jpg");
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
          favImages.appendChild(imgContainer)

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
            delete_images_favorites(data);

          }); // end add btn
        }
      }
    }
  }
/***********************END FAV IMAGES*************************/

  function displayAllPlaces(response){
    console.log("displayAllPlaces", response);
    hideEverything();
    showAllPlaces();
    showAllImages();
    console.log(wrapper);
    for(var key in response){
      switch (key) {
        case "main":
        var main = document.createElement('div');
          main.innerHTML = "<b>Main:</b>";
          main.id="mainid";
          allPlaces.appendChild(main);
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
                  allPlaces.appendChild(flexMain);
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
          allPlaces.appendChild(flexMain);
          name.innerHTML +=response[key];
          var add = document.createElement("button");
          add.id = "addWeather";
          add.className="glyphicon glyphicon-heart";
          add.innerText = "Favorite"
          flexMain.appendChild(add);

          add.addEventListener("click", function(){
            var parent = $(this).parent();
            locatName = parent[0].children[1].children[0].childNodes[0].data;
            console.log("locatName", locatName);

            var dataPlace = {
              name: locatName
            }

            post_places_favorites(dataPlace);
          });
          break;

        case "weather":
          var weather = document.createElement('div');
          weather.innerHTML = "<br>"+"<b>"+ "Description" + ":</b><br>";
          allPlaces.appendChild(weather);
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

  //displays images
  function displayAllImages(response){
    set_background("back2.jpg");
    allImages.innerHTML = "";
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
        allImages.innerHTML = "SORRY THERE ARE NO IMAGES WITH THAT CRITERIA, TRY AGAIN..."
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
          allImages.appendChild(imgContainer)

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

            post_images_favorites(data);
          }); // end add btn

        } //end for loop
        set_background(highestLikesUrl);

      }//end else
    }

  } //end funx

  }; // end window onload fxn
