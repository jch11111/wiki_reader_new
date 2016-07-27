var wikki = (function () {

    var init = function () {
        $(function () {

//            $("#btnToggleTemperature").click(toggleTemperature);

            $.when(getWikki())
            .then(displayWikki);
                
        })
    };

    function getWikki() {
    
        var apiURL =
                "https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&callback=?";
        
        return $.ajax( {
            url: apiURL,
            dataType: 'json',
            type: 'POST'
//            ,headers: { 'Api-User-Agent': 'Example/1.0' }
/*            ,success: function(wikkiData) {
               successfullyGotWikki(wikkiData);
            }*/
        } );        

    }

    function displayWikki(wikkiData) {
//        alert(wikkiData);
        for (var p in wikkiData.query.pages["15580374"].revisions[0]) {
            console.log(p);
        }
        $("#results").html(wikkiData.query.pages["15580374"].revisions[0]["*"]);
/*        $("#weather").text(weatherDescription);

        $("#imgWeatherIcon").attr("src", imageUrl);*/
    }


    return {
        init: init
    };


}());

wikki.init();
