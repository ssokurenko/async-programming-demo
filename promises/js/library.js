/**
 * Created by Sergey Sokurenko on 1/14/17.
 */
(function (window) {
    const numberOfProducts = 100;

    function API() {
        function createRandomProduct() {
            const typeArray = ['Electronics', 'Book', 'Clothing', 'Food'],
                price = (Math.random() * 500).toFixed(2),
                type = typeArray[Math.floor(Math.random() * 4)];
            return {
                price: price,
                type: type
            }
        }

        function createRandomProducts(numberOfItems) {
            var products = [];
            for (let i = 0; i < numberOfItems; i++) {
                const product = createRandomProduct();
                products.push({
                    id: i,
                    price: product.price,
                    type: product.type
                });
            }

            return products;
        }

        var catalog = createRandomProducts(numberOfProducts);

        function searchAllProducts() {
            var promise = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(catalog);
                }, 2000);
            });

            return promise;
        }

        function searchProductsByType(type) {
            var promise = new Promise(function (resolve, reject) {
                var i = 0,
                    foundProducts = [],
                    possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];

                if (!possibleTypes.includes(type)) {
                    reject('Error: ' + type + ' is not supported');
                } else {
                    while (i < catalog.length) {
                        if (catalog[i].type === type) {
                            foundProducts.push({
                                id: catalog[i].id,
                                price: catalog[i].price,
                                type: catalog[i].type
                            });
                        }
                        i++;
                    }
                    resolve(foundProducts);
                }
            });
            return promise;
        }

        function searchProductsByPrice(price, difference) {
            var promise = new Promise(function (resolve, reject) {
                var i = 0,
                    foundProducts = [];
                if (!isFinite(price)) {
                    reject('Invalid price: ' + price);
                } else {
                    window.setTimeout(function () {
                        while (i < catalog.length) {
                            if (Math.abs(catalog[i].price - price) < difference) {
                                foundProducts.push({
                                    id: catalog[i].id,
                                    price: catalog[i].price,
                                    type: catalog[i].type
                                });
                            }
                            i++;
                        }
                        resolve(foundProducts);
                    }, 1000);
                }
            });
            return promise;
        }

        function searchProductById(id) {
            var promise = new Promise(function (resolve, reject) {
                window.setTimeout(function () {
                    if (catalog[id] !== undefined) {
                        resolve(catalog[id]);
                    } else {
                        reject('Invalid product id: ' + id);
                    }
                }, 1000);
            });

            return promise;
        }

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }
    }

    window.api = API();
})(window);
