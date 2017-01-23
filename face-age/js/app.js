/**
 * Created by Sergey Sokurenko on 1/23/17.
 */

app = {};

$(document).ready(function () {

    // DOM Elements

    app.dom = {
        imageUrl: $('#image-url'),
        analyseButton: $('#analyse-image'),
        loadingProgressBar: $('.progress-bar'),
        imagePreview: $('#image-preview'),
        imageAttributes: $('#image-attributes')
    };

    // Event Listeners

    app.dom.analyseButton.click(app.actions.analyseImage);


});

// Actions

app.actions = {
    analyseImage: function () {
        var imageUrl = app.dom.imageUrl.val(),
            requestUrl = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age,gender',
            requestBody = {
                url: imageUrl
            },
            requestHeader = new Headers({
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'cc72dc5c4a70446b941e1486e87eda10'
            }),
            requestSettings = {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: requestHeader
            },
            imageAttributes;

        // Displaying the loader

        app.dom.loadingProgressBar.css('visibility', 'visible');
        app.dom.imageAttributes.html('loading...');

        // Displaying the image preview
        app.dom.imagePreview.attr('src', imageUrl);

        var request = new Request(requestUrl, requestSettings);

        fetch(request).then(function (response) {

            // Hiding the loader

            app.dom.loadingProgressBar.css('visibility', 'hidden');

            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        }).then(function (response) {
            if (response[0]) {
                console.log(response[0]);
                imageAttributes = 'age: ' + response[0].faceAttributes.age + ' years, gender: ' + response[0].faceAttributes.gender;
            } else {
                imageAttributes = 'No Faces Detected';
            }

            app.dom.imageAttributes.html(imageAttributes);
        }).catch(function (response) {
            alert('Error: ' + response);
        });

    }
};



