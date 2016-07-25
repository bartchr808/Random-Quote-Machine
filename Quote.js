'use strict';



function callQuoteAuthor(callback) {
    $.ajax({
        url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {},
        xhrFields: {
            withCredentials: false
        },
        success: callback
    });
}



function changeColor() {

    var colors = ['aqua', 'blue', 'fuchsia', 'gray', 'green', 'maroon', 'navy', 'orange', 'purple', 'red', 'silver', 'teal', 'white', 'yellow'];

    var inverted = ['deeppink', 'gold', 'khaki', 'darkviolet', 'limegreen', 'olive', 'cadetblue', 'tan', 'chocolate', 'antiquewhite', 'darkred', 'lime', 'lavender'];

    var $id = $(this).attr("href");

    $("body").css({
        "background-color": colors[Math.floor(Math.random() * 14)],
        "transition": "background-color 1.0s ease"
    });

    $("h1").css({
        "color": inverted[Math.floor(Math.random() * 13)],
        "transition": "color 1.0s ease"
    });

    setTimeout(function () {
        $($id).css("background-color", "#ffffff");
    }, 2500);
}




function tweet() {

    // Assign variables to string components
    var quote = $('#quote').text();
    var author = $('#author').text();

    // Make sure tweet is never over 140 characters
    var url = "http://codepen.io/bartchr808/pen/PzJOJY";
    var length = url.length + author.length + 4;
    console.log(length);
    var substringedQuote = quote.substring(0, (140 + 16 - length)) //WHY ADD 16???????
    console.log(substringedQuote);
    console.log(substringedQuote.length);
    var tweetText = substringedQuote + ' - ' + author + " " + "http://codepen.io/bartchr808/pen/PzJOJY";

    // Encode string
    var encoded = encodeURI(tweetText);
    console.log(encoded);


    window.open('https://twitter.com/intent/tweet?text=' + encoded, '_blank');

}




$(document).ready(function () {



    callQuoteAuthor(function (response) {
        //console.log(response);
        $("#quote").text(response.quoteText);
        $("#author").text(response.quoteAuthor);
        console.log("Two quote:")
        console.log(response.quoteText);
        // do something with reponse
    });

    changeColor();



    $('#quotebutton').click(function () {
        callQuoteAuthor(function (response) {
            console.log('button');
            console.log(response);
            changeColor();
            $("#quote").text(response.quoteText);
            $("#author").text(response.quoteAuthor);
            console.log('One');
        })
    });

});







//$.getJSON('http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?', function(json) { 
//	console.log(json);