var wikki = (function () {
    var resultsDiv;

    var init = function () {
        $(function () {

            resultsDiv = $('#results');
            addEventHandlers();
                
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
        resultsDiv.empty();

        if (0 === searchResults.query.search.length) {
            displayHtml('your search returned no results');
        }

        searchResults.query.search.forEach(function (article) {
            var articleTitleForUrl,
                articleLink;
            articleTitleForUrl = article.title.replace(/\s/g, '_');
            articleLink =
                "<a href=\"" +
                "https://en.wikipedia.org/wiki/" +
                articleTitleForUrl +
                "\" target=\"_blank\">" +
                "<b>" + article.title + ": " + "</b>" +
                article.snippet +
                "</a>"
            displayHtml(articleLink);
        });
    }

    function displayHtml(htmlContent) {
        var newDiv = $('<div></div>');

        newDiv.html(htmlContent);
        resultsDiv.append(newDiv);
    }

    return {
        init: init
    };


}());

wikki.init();
