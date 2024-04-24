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
    var counter = 0;
    return function count() {
        var t = counter;
        counter = counter + 1;
        return t;
    };
}
 
var id = generateId();
 //factory function that return array to hold data of item
function Product(name, category, price, quantity, images) {
    var arr = [];
    return {
        id: id(),
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        images: images,
        holder: function() {
            return arr.push(this);
        }
    };
}
 //vars off each item
var cappuccino = Product('Cappuccino', 'Espresso', '4.50', 100, ['./images/espresso.png', '.images/cammill.png']);
var latte = Product('Latte', 'Espresso', '5.00', 80, ['./images/cappuccino.png', './images/frappo.png']);
var americano = Product('Americano', 'Espresso', '3.50', 120, ['./images/cammill.png', './images/omlett.png']);
var mocha = Product('Mocha', 'Espresso', '5.50', 70, ['./images/EggTart.png', './images/crep.png']);
var coffeeItems = [cappuccino, latte, americano, mocha];
//this function that change image with click i use oncklick to change the image the parameter are  the element represent html element that is imge to function click event 
//and itemIndex  that is number to help on click event
function changeImage(element, itemIndex) {
    var counter = 1;
    element.on('click', function () {
        console.log(element[0].images);
        var images = element[itemIndex].images;
        var imgCount = images.length;
        element.attr('src', images[counter]);
        counter++;
        if (counter > imgCount - 1) {
            counter = 0;
        }
    });
}


function filterItems(){
    var search=$('#myInput').val()
    console.log(search)
    if (search==='') {
        show(coffeeItems)
    } else {
        var filtred=filter(coffeeItems,function(element){ 
            return element.category===search}); 
        $('.section-center').empty()

        each(filtred, function (element, i) {
            $('.section-center').append(
                `  <div class="item">
                    <div><img id="${element.name}" src="${element.images[0]}"></div>
                    <div>
                        <h2>${element.name}</h2>
                        <h2>${element.price}</h2>
                        <h2>${element.category}</h2>
                        <button class="buy-btn" onclick='deleteItem('${element.name}',${i})>buy</button>
                    </div>
                </div>`
            );

            changeImage($(`#${element.name}`), i);
        });

    }

}




function show(coffeeItems) {
    $('.section-center').empty()
     each(coffeeItems, function (element, i) {
        $('.section-center').append(
            `  <div class="item">
                <div><img id="${element.name}" src="${element.images[0]}"></div>
                <div>
                    <h2>${element.name}</h2>
                    <h2>${element.quantity}</h2>
                    <h2>${element.category}</h2>
                    <button class="delet" onclick=deleteItem(${element.name},${element.id})>buy</button>
                </div>
            </div>`
        );
      
        changeImage($(`#${element.name}`), i);
    });
    
          
      
}
//function buy that delet the var item from coffeItem array using splice and return allert that contene messege to confirm the delet
//and we invoce show with nwe array
 function deleteItem(name,i) {
    for (var i = 0; i < coffeeItems.length; i++) {
        if (coffeeItems[i].id === item.id) {
            coffeeItems.splice(i, 1);
            alert("Are you sure you want to delete?");
            show(coffeeItems); 
            break; // Exit loop once the item is deleted
        }}}
show(coffeeItems)