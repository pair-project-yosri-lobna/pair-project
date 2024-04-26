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

var id = (function () {
    var counter = 0;
    return function () {
        var t = counter;
        counter = counter + 1;
        return t;
    };
});


//factory function that return array to hold data of item
function Product(name, category, price, quantity, images) {
    return {
        id: id(),
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        images: images
    };
}
//vars off each item
var latte = Product('Latte', 'espresso', '5.00', 80, ['../images/lattee.png', '../images/lattee1.png']);
var espresso = Product('Espresso', 'espresso', '3.00', 90, ['../images/expresso1.png', '../images/expresso2.png']);
var macchiato = Product('Macchiato', 'espresso', '4.00', 85, ['../images/machiato1.png', '../images/machiato2.png']);
var americano = Product('Americano', 'espresso', '3.50', 120, ['../images/americano1.png', '../images/americano2.png']);

var frappuccino = Product('Frappuccino', 'iced coffee', '6.00', 100, ['../images/frappo1.png', '../images/fraposhino2.png']);
var icedLatte = Product('Iced Latte', 'iced coffee', '5.50', 95, ['../images/iccecofee.png', '../images/icecoff.png']);
var coldBrew = Product('Cold Brew', 'iced coffee', '4.50', 110, ['../images/coldBrew1.png', '../images/coldBrew2.png']);

var greenTea = Product('Tea', 'Tea', '3.00', 80, ['../images/greentea1.png', '../images/greentea2.png']);
var tea = Product('Green Tea', 'Tea', '3.50', 75, ['../images/tea2.png', '../images/tea1.png']);
var chaiTea = Product('Chai Tea', 'Tea', '4.00', 85, ['../images/chaiTea1.png', '../images/chaiTea2.png']);

var hotChocolate = Product('Hot Chocolate', 'hot coffe', '4.00', 90, ['../images/hotChocolate1.png', '../images/hotChocolate2.png']);
var caramelMacchiato = Product('Caramel Macchiato', 'hot coffe', '5.50', 85, ['../images/caramelMacchiato2.png', '../images/caramelMacchiato1.png']);
var pumpkinSpiceLatte = Product('Pumpkin Spice Latte', 'hot coffe', '6.00', 80, ['../images/pumpkinSpiceLatte2.png', '../images/pumpkinSpiceLatte1.png']);


var coffeeItems = [latte, espresso, macchiato, americano, frappuccino, icedLatte, coldBrew, tea, greenTea, chaiTea, hotChocolate, caramelMacchiato, pumpkinSpiceLatte];


//this function that change image with click i use oncklick to change the image the parameter are  the element represent html element that is imge to function click event 
//and itemIndex  that is number to help on click event
function changeImage(element, itemIndex) {
    var counter = 1;
    element.on('click', function () {

        var images = coffeeItems[itemIndex].images;
        var imgCount = images.length;
        element.attr('src', images[counter]);
        counter++;
        if (counter > imgCount - 1) {
            counter = 0;
        }
    });
}



function show(coffeeItems) {
    $('.section-center').empty()
    each(coffeeItems, function (element, i) {
        $('.section-center').append(
            `  <div class="item">
                <div class='imag'><img id=${element.name} src=${element.images[0]} /></div>
                <div>
                    <h2>name:${element.name}</h2>
                    <h2>proudct:${element.quantity} </h2>
                    <h2>category:${element.category}</h2>
                    <button class="click" onclick=deletItem(${element.name},${i})>Delet</button>
                </div>
            </div>`
        );
        changeImage($(`#${element.name}`), i);
    });

}
function filterItems() {
    var search = $('#myInput').val()
    console.log(search)
    if (search === '') {
        show(coffeeItems)
    } else {
        var filtred = filter(coffeeItems, function (element) {
            return element.category === search
        });
        $('.section-center').empty()

        each(filtred, function (element, i) {
            $('.section-center').append(
                `  <div class="item">
                        <div><img id="${element.name}" src="${element.images[0]}"></div>
                        <div>
                        <h2>name:${element.name}</h2>
                        <h2>proudct:${element.quantity} </h2>
                        <h2>category:${element.category}</h2>
                            <button class="click-me" onclick=deletItem(${element.name},${i})>Delet</button>
                            </div>
                            </div>`
            );

            changeImage($(`#${element.name}`), i);
        });

    }

}
show(coffeeItems)
