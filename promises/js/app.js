/**
 * Created by Sergey Sokurenko on 1/14/17.
 */

var app = {};

$(document).ready(function () {
    // DOM Elements

    app.dom = {
        productProgressBar: $('.product-progress'),
        selectedProductID: $('.selected-product-id'),
        selectedProductPrice: $('.selected-product-price'),
        selectedProductType: $('.selected-product-type'),
        searchProductButton: $('button.search-product'),
        searchProductInput: $('#search-product-input'),
        similarProductsList: $('.similar-products-list'),
        allProductsProgressBar: $('.all-products-progress'),
        allProductsList: $('.all-products-list')
    };

    // Events

    app.dom.searchProductButton.click(function () {
        app.dom.productProgressBar.css('visibility', 'visible');
        api.searchProductById(app.dom.searchProductInput.val())
            .then(app.helpers.examineProduct)
            .catch(function (error) {
                alert(error);
            });
    });

    // Promises

    app.dom.promises = {
        searchAllProducts: api.searchAllProducts()
    };

    app.dom.promises.searchAllProducts
        .then(function (products) {
            app.dom.allProductsProgressBar.hide();
            app.helpers.updateTable(app.dom.allProductsList, products);
        })
        .catch(function (error) {
            alert(error);
        });

    // Helpers

    app.helpers = {
        updateExamineButtons: function () {
            app.dom.examineProductButtons = $('.examine-product-button');
            app.dom.examineProductButtons.click(function () {
                app.dom.productProgressBar.css('visibility', 'visible');
                api.searchProductById($(this).data('id')).then(app.helpers.examineProduct);
            });
        },
        examineProduct: function (product) {
            app.dom.productProgressBar.css('visibility', 'hidden');
            app.dom.selectedProductID.html(product.id);
            app.dom.selectedProductPrice.html(product.price);
            app.dom.selectedProductType.html(product.type);
            app.helpers.showSimilarProducts(product.type);
        },
        updateTable: function (table, products) {
            table.html('');
            $.each(products, function (key, product) {
                table.append(
                    '<tr>' +
                    '<th>' + product.id + '</th>' +
                    '<th>' + product.price + '</th>' +
                    '<th>' + product.type + '</th>' +
                    '<th><button class="btn btn-default examine-product-button" data-id="' + product.id + '">Examine</button></th>' +
                    '</tr>'
                );
            });
            app.helpers.updateExamineButtons();
        },
        showSimilarProducts: function (type) {
            var relatedProductsPromise = api.searchProductsByType(type);
            app.dom.similarProductsList.html('');
            relatedProductsPromise.then(function (products) {
                app.helpers.updateTable(app.dom.similarProductsList, products);
            });
        }
    };
});





