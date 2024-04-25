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
var n = $('#name').val()
var c = $('#category').val()
var p = $('#price').val()
var q = $('#quantity').val()
var i = $('#pic').val()

/**var ProductM = function (name, category, price, quantity, images) {
    return {
        id: id(),
        name: name,
        category: category,
        price: price,
        quantity: quantity,
        images: images
    }
}

var product1 = Product("Coffe", "Drinks", 1.99, 2, [""])
var product2 = Product("Milk Choklet", "Drinks", 2.99, 1, [""])
var product3 = Product("I ced Coffe", "Drinks", 9.99, 3, [""])
var product4 = Product("Coffe ", "Drinks", 19.99, 1, [""])*/

var Product = function () {
    return {
        id: id(),
        name: $('#name').val(),
        category: $('#category').val(),
        price: $('#price').val(),
        quantity: $('#quantity').val(),
        images: $('#pic').val()

    }
}


function makeProduct() {
    var obj = {}
    obj.items = []
    obj.addProduct = addProduct
    obj.removeProduct = removeProduct
    obj.removeProductById = removeProduct
    obj.updateProduct = updateProduct
    obj.display = display
    obj.displayAll = displayAll
    return obj
}


var addProduct = function (n, c, p, q, i) {
    n = $('#name').val()
    c = $('#category').val()
    p = $('#price').val()
    q = $('#quantity').val()
    i = $('#pic').val()

    var newProduct = Product(n, c, p, q, i)
    this.items.push(newProduct)
    return "Product add with sucsess"
   
}


$('#submit').on('click', function () {

    productShop.addProduct(n, c, p, q)
    productShop.displayAll()
    return "Product add with sucsess" + this.items

})

$("#list tr").click(function () {
    $("td").remove();
});

$(".fa-trash").click(function () {
    productShop.removeProductById(1)
    $("td").remove();
});


var removeProduct = function (id) {

     filter(this.items, function (element) {
        return element.id !== id
    })
  

}

var removeProductById = function (id) {

    return filter(this.items, function (element, i) {
        element.id === id
        this.items.splice(i, 1)
        return this.items
    })
}

var updateProduct = function (id,name,category,price,quantity,images) {

    var arr = this.items
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            arr[i].name = name
            arr[i].category = category
            arr[i].price = price
            arr[i].quantity= quantity
            arr[i].images= images
        }
    }
    return arr
}

var display = function (id) {

    for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id) {
            return this.items[i].name + " " + " " + this.items[i].category + " " +
                this.items[i].price + " " + this.items[i].quantity + " " + this.items[i].images
        }

    }
}

var displayAll = function () {

    return map(this.items, function (element,i) {
        $("#list").append(`<tr><td> ${element.id }
        </td><td> ${element.name }</td><td> ${element.category} </td><td>
        ${element.price} Euro </td><td> ${element.quantity } </td><td><img></td><td><i></i></td></tr>`)
        $("#list img").attr('src',element.images)
        $("i").addClass("fas fa-trash")

        /**$("#list").append("<tr><td>" + element.id +
             "</td><td>" + element.name + "</td><td>" + element.category + "</td><td>" +
             element.price + " " + "Euro" +
             "</td><td>" + element.quantity + "</td><td><img></td><td><i></i></td></tr>")
         $("#list img").attr('src', element.images[i])
         $("i").addClass("fas fa-trash")*/
    })
}


var productShop = makeProduct()
/**productShop.addProduct("Coffe Espresso", "White", 3.25, 22, ["../images/1.jpg"])
productShop.addProduct("Coffe Noir", "Dark", 4.99, 18, ["../images/2.jpg"])
productShop.addProduct("Nescafe", "Dark", 7.99, 33, ["../images/images(1).jpg"])
productShop.addProduct("Coffe ", "I ced Coffe", 5, 11, ["../images/360.jpg"])
productShop.addProduct("Capucino", "Darks", 12, 21, ["../images/5.jpg"])
productShop.addProduct("Americano", "Darks Coffe", 9.99, 12, ["../images/d.jpg"])*/
productShop.addProduct()
console.log(productShop.items)
console.log(productShop.items[0])
console.log(productShop.items[0].images[0])
productShop.removeProduct(0)
productShop.removeProductById(1)
productShop.updateProduct(0, "Coffe Espresso","White",2.99,3)
productShop.display(1)
productShop.displayAll()


//jquery
$('h1').append('Coffee Shop List')
$('th#idT').append("Product Id")
$('th#nameT').append("Product Name")
$('th#categoryT').append("Category")
$('th#priceT').append("Price")
$('th#quantityT').append("Quantity")
$('th#imagesT').append("Images")
$('th#remove').append("Remove")

$('#item1').attr('src', "../images/coffe.jpg")
$('#item2').attr('src', "../images/5.jpg")
$('#item3').attr('src', "../images/d.jpg")
$('#item4').attr('src', "../images/360.jpg")

var pict = ["../images/1.jpg", "../images/2.jpg", "../images/images.jpg", "../images/136051.jpg", "../images/3.jpg"]
var countt = 0
$('#item1').on({
    'click': function () {
        countt = (countt + 1) % pict.length
        $('#item1').attr('src', pict[countt])

    }
});

var items = productShop.items
var pictures = productShop.items.images
var count = -1
var i = 0

/*while (count < items.length) {

    count = count + 1

    $("#list").append("<tr><td>" + items[count].id +
        "</td><td>" + items[count].name + "</td><td>" + items[count].category + "</td><td>" +
        items[count].price + " " + "Euro" +
        "</td><td>" + items[count].quantity + "</td><td><img/></td><td><i></i></td></tr>")
    $("#list img").attr('src', items[count].images)
    $("i").addClass("fas fa-trash")
}*/

