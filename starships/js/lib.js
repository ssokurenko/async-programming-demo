function run(genFunc) {
    const genObject = genFunc(); //creating a generator object

    function iterate(iteration) { //recursive function to iterate through promises
        if (iteration.done) //stop iterating when done and return the final value wrapped in a promise
            return Promise.resolve(iteration.value);
        return Promise.resolve(iteration.value) //returns a promise with its then() and catch() methods filled
                .then(x => iterate(genObject.next(x))) //calls recursive function on the next value to be iterated
    .catch(x => iterate(genObject.throw(x))); //throws an error if a rejection is encountered
    }

    try {
        return iterate(genObject.next()); //starts the recursive loop
    } catch (ex) {
        return Promise.reject(ex); //returns a rejected promise if an exception is caught
    }
}

starships = {
    'CR90 Corvette': 2,
    'V-wing': 75,
    'Belbullab-22 Starfighter': 74,
    'Jedi Interceptor': 65,
    'Star Destroyer': 3,
    'Trade Fedaration Cruiser': 59,
    'Solar Sailer': 58,
    'Republic Attack Cruiser': 63,
    'A-wing': 28,
    'B-wing': 29,
    'Naboo Fighter': 39,
    'Millenium Falcon': 10
};
