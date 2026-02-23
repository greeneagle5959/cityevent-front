
$("#cp").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://data.geopf.fr/geocodage/search/?postcode=" + $("input[name='cp']").val() + "&limit=15&",
            data: { q: request.term },
            dataType: "json",
            success: function (data) {
                var postcodes = [];
                response($.map(data.features, function (item) {

                    if ($.inArray(item.properties.postcode, postcodes) == -1) {
                        postcodes.push(item.properties.postcode);
                        return {
                            label: item.properties.postcode + " - " + item.properties.city,
                            city: item.properties.city,
                            value: item.properties.postcode
                        };
                    }
                }));
            }
        });
    },
});

$("#ville").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://data.geopf.fr/geocodage/search/?city=" + $("input[name='ville']").val() + "&limit=15",
            data: { q: request.term },
            dataType: "json",
            success: function (data) {
                var cities = [];
                response($.map(data.features, function (item) {

                    if ($.inArray(item.properties.postcode, cities) == -1) {
                        cities.push(item.properties.postcode);
                        return {
                            label: item.properties.postcode + " - " + item.properties.city,
                            postcode: item.properties.postcode,
                            value: item.properties.city
                        };
                    }
                }));
            }
        });
    },
});


$("#adresse").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://data.geopf.fr/geocodage/search/?postcode=" + $("input[name='cp']").val() + "&limit=15&",
            data: { q: request.term },
            dataType: "json",
            success: function (data) {
                response($.map(data.features, function (item) {
                    return {
                        label: item.properties.name + " - " + item.properties.postcode + " - " + item.properties.city,
                        value: item.properties.name,
                        city: item.properties.city,
                        postcode: item.properties.postcode
                    };
                }));
            }
        });
    },
    select: function (event, ui) {

        $('#adresse').val(ui.item.name);
        $('#cp').val(ui.item.postcode);
        $('#ville').val(ui.item.city);
    }
});
