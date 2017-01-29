/**
 * Created by Sergey Sokurenko on 1/28/17.
 */

app = {};

$(document).ready(function () {

    // DOM Elements

    app.dom = {
        compareButton: $('button.compare'),
        starshipsTable: $('#starshipsTable')
    };

    // Event Listeners

    app.dom.compareButton.click(app.actions.compare);


});

// Actions

app.actions = {
    compare: function () {
        run(gen).catch(function (err) {
            alert(err.message);
        });
    }
};

function* gen() {
    var leftItem = $('#spaceships-left-input').val(),
        rightItem = $('#spaceships-right-input').val(),
        API = 'https://swapi.co/api/starships/';

    if (starships[leftItem] === undefined || starships[rightItem] === undefined) {
        alert('The starships do not exist. Please correct input data.')
    } else {
        const leftShipResponse = yield fetch(API + starships[leftItem]);
        const rightShipResponse = yield fetch(API + starships[rightItem]);

        const leftShipData = yield leftShipResponse.json();
        const rightShipData = yield rightShipResponse.json();

        updateStarships(leftShipData, rightShipData);
        compareAndHighlight(leftShipData, rightShipData);

    }
}

function updateStarships(leftShipData, rightShipData) {
    app.dom.starshipsTable.find('tbody').html(`<tr>
                    <td><strong>Name</strong></td>
                    <td>` + leftShipData.name + `</td>
                    <td>` + rightShipData.name + `</td>
                </tr>
                <tr>
                    <td><strong>Cost</strong></td>
                    <td class="cost-left">` + leftShipData.cost_in_credits + ` </td>
                    <td class="cost-right">` + rightShipData.cost_in_credits + ` </td>
                </tr>
                <tr>
                    <td><strong>Speed</strong></td>
                    <td class="speed-left">` + leftShipData.max_atmosphering_speed + ` </td>
                    <td class="speed-right">` + rightShipData.max_atmosphering_speed + ` </td>
                </tr>
                <tr>
                    <td><strong>Cargo</strong></td>
                    <td class="cargo-left">` + leftShipData.cargo_capacity + ` </td>
                    <td class="cargo-right">` + rightShipData.cargo_capacity + ` </td>
                </tr>
                <tr>
                    <td><strong>Passengers</strong></td>
                    <td class="passengers-left">` + leftShipData.passengers + ` </td>
                    <td class="passengers-right">` + rightShipData.passengers + ` </td>
                </tr>`);
    console.log(leftShipData, rightShipData);
}

function compareAndHighlight(leftShipData, rightShipData) {
    compareValues(leftShipData.cost_in_credits, rightShipData.cost_in_credits, 'cost');
    compareValues(leftShipData.max_atmosphering_speed, rightShipData.max_atmosphering_speed, 'speed');
    compareValues(leftShipData.cargo_capacity, rightShipData.cargo_capacity, 'cargo');
    compareValues(leftShipData.passengers, rightShipData.passengers, 'passengers');
}

function compareValues (val1, val2, cssclass) {
    val1 = parseInt(val1);
    val2 = parseInt(val2);
    if (val1 > val2) {
        $('.' + cssclass + '-left').addClass('red');
    } else if (val2 > val1) {
        $('.' + cssclass + '-right').addClass('red');
    }
}



