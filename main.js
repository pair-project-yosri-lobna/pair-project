function each(array, func) {
    for (var i = 0; i < array.length; i++) {
        func(array[i], i);
    }
}

function map(array, f) {
    var acc = [];
    each(array, function (element, i) {
        acc.push(f(element, i));
    });
    return acc;
}

function filter(array, predicate) {
    var acc = [];
    each(array, function (element, index) {
        if (predicate(element, index)) {
            acc.push(element);
        }
    });
    return acc;
}

function reduce(array, f, acc) {
    if (acc === undefined) {
        acc = array[0];
        array = array.slice(1);
    }
    each(array, function (element, i) {
        acc = f(acc, element, i);
    });
    return acc;
}

function generateId() {
    var counter = 0
    return function count() {
        var t = counter
        counter = counter + 1
        return t
    }
}

var id = generateId()

var Product = function (name, category, price, quantity, images) {
    return {
        id: id(),
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        images: images
    }
}

