var wikki = (function () {

    var init = function () {
        $(function () {

//            $("#btnToggleTemperature").click(toggleTemperature);
            addEventHandlers();

            //$.when(getWikki())
            //.then(displayWikki);
                
        })
    };

    function addEventHandlers() {
        $('button').click(function () {
            searchButton_click();
        });
        $('#searchText').keydown(function (e) {
            searchText_onKeyDown(e.keyCode);
        });
    }

    function searchButton_click() {
        $.when(getSearchResults())
        .then(displaySearchResults)
        .then($('#searchText').val(''));
    }

    function searchText_onKeyDown(keyCode) {
        if (13 === keyCode) {
            $('button').click();
        }
    }

    function getSearchResults() {
        var searchText = encodeURIComponent($('#searchText').val());
        var searchUrl = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchText + "&format=json&callback=?";

        return $.ajax({
            url: searchUrl,
            dataType: 'json',
            type: 'POST'
        });
    }

    function displaySearchResults(searchResults) {
        var resultsDiv = $('#results'),
            newDiv,
            article,
            articleTitleForUrl,
            articleLink;

        resultsDiv.empty();

        for (var articleNumber = 0; articleNumber < 10; articleNumber++) {
            newDiv = $('<div></div>');
            article = searchResults.query.search[articleNumber];
            articleTitleForUrl = article.title.replace(/\s/g, '_');
            articleLink =
                "<a href=\"" +
                "https://en.wikipedia.org/wiki/" +
                articleTitleForUrl + 
                "\" target=\"_blank\">" +
                "<b>" + article.title + ": " + "</b>" +
                article.snippet +
                "</a>"
            newDiv.html(articleLink);
            resultsDiv.append(newDiv);
        }
    }


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
