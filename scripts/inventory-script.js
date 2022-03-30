

let allProducts = {};

// db.transaction(t=>{
//     t.executeSql('DELETE FROM products')
// })
db.transaction(t => {
    t.executeSql('SELECT * FROM products', [], function (t, results) {
        console.log(results.rows);
        for (let item in results.rows) {

            allProducts[results.rows[item].id] = results.rows[item];
        }
        
    });
})


db.transaction(t => {
    t.executeSql('CREATE TABLE IF NOT EXISTS products (id  TEXT, type TEXT,brand TEXT, size TEXT, price NUMBER,quantity NUMBER)');
}, e => console.error(e));



db.transaction(t => {
    t.executeSql('SELECT DISTINCT (brand) from products ', [], function (t, results) {

        // console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
            let brandName = results.rows[i].brand;
            let div = document.createElement('div');
            div.setAttribute('class', 'brand');
            let brandHeading = document.createElement('h2');
            brandHeading.innerHTML = brandName;
            div.append(brandHeading);
            document.getElementById('brands-content').append(div);

        }

    })

    t.executeSql('SELECT DISTINCT (size) from products ', [], function (t, results) {

        // console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
            let size = results.rows[i].size;
            let div = document.createElement('div');
            div.setAttribute('class', 'size');
            let sizeHeading = document.createElement('h2');
            sizeHeading.innerHTML = size;
            div.append(sizeHeading);
            document.getElementById('sizes-content').append(div);

        }

    });

    t.executeSql('SELECT DISTINCT (type) from products ', [], function (t, results) {

        // console.log(results.rows);
        for (let i = 0; i < results.rows.length; i++) {
            let type = results.rows[i].type;
            let div = document.createElement('div');
            div.setAttribute('class', 'category');
            let categoryHeading = document.createElement('h2');
            categoryHeading.innerHTML = type;
            div.append(categoryHeading);
            document.getElementById('categories-content').append(div);

        }

    })

    t.executeSql('SELECT * FROM products ', [], function (t, results) {

        for (let i = 0; i < results.rows.length; i++) {


            // CREATE NEW ROW
            let row = document.createElement('tr');
            row.setAttribute('class', 'product');
            let productId = document.createElement('td');
            productId.innerHTML = results.rows[i].id;
            let productType = document.createElement('td');
            productType.innerHTML = results.rows[i].type;
            let productBrand = document.createElement('td');
            productBrand.innerHTML = results.rows[i].brand;
            let productPrice = document.createElement('td');
            productPrice.innerHTML = results.rows[i].price;
            let productSize = document.createElement('td');
            productSize.innerHTML = results.rows[i].size;
            let productQuantity = document.createElement('td');
            productQuantity.innerHTML = results.rows[i].quantity;

            row.append(productId);
            row.append(productType);
            row.append(productBrand);
            row.append(productSize);
            row.append(productPrice);
            row.append(productQuantity);


            document.getElementById('product-table').append(row);
        }
    })
});



function displayBrands() {
    let currentValue = document.getElementById('brands-content').style.display;
    if (currentValue === 'block') {
        document.getElementById('brands-content').style.display = 'none';
    }
    else {
        document.getElementById('brands-content').style.display = 'block';
    }

}

function displayProducts() {
    let currentValue = document.getElementById('products-content').style.display;
    if (currentValue === 'block') {
        document.getElementById('products-content').style.display = 'none';
    }
    else {
        document.getElementById('products-content').style.display = 'block';
    }
}

function displaySizes() {
    let currentValue = document.getElementById('sizes-content').style.display;
    if (currentValue === 'block') {
        document.getElementById('sizes-content').style.display = 'none';
    }
    else {
        document.getElementById('sizes-content').style.display = 'block';
    }
}

function displayCategories() {
    let currentValue = document.getElementById('categories-content').style.display;
    if (currentValue === 'block') {
        document.getElementById('categories-content').style.display = 'none';
    }
    else {
        document.getElementById('categories-content').style.display = 'block';
    }

}
function addProduct() {

    var form = document.getElementById('add-product');
    const name = form.elements[0].value;
    const type = form.elements[1].value;
    const brand = form.elements[2].value;
    const price = form.elements[3].value;
    const size = form.elements[4].value;
    const quantity = form.elements[5].value;

    // console.log(allProducts[name]);
    let div = document.createElement('div');
    div.setAttribute('class', 'product');
    // CREATE NEW ROW
    let row = document.createElement('tr');
    row.setAttribute('class', 'product');
    let productId = document.createElement('td');
    productId.innerHTML = name;
    let productType = document.createElement('td');
    productType.innerHTML = type;
    let productBrand = document.createElement('td');
    productBrand.innerHTML = brand;
    let productPrice = document.createElement('td');
    productPrice.innerHTML = price;
    let productSize = document.createElement('td');
    productSize.innerHTML = size;
    let productQuantity = document.createElement('td');
    productQuantity.innerHTML = quantity;
    row.append(productId);
    row.append(productType);
    row.append(productBrand);
    row.append(productSize);
    row.append(productPrice);
    row.append(productQuantity);


    document.getElementById('product-table').append(row);

    db.transaction(t => {
        t.executeSql('SELECT quantity from products WHERE id="' + name + '"', [], function (t, results) {
            if (results.rows.length === 0) {

            }
            else {
                if (allProducts[name]) {
                    console.log(parseInt(parseInt(allProducts[name].quantity) + parseInt(productQuantity.innerHTML)));
                    let newQ = parseInt(parseInt(allProducts[name].quantity) + parseInt(productQuantity.innerHTML));
                    t.executeSql('UPDATE products SET quantity = "' + newQ + '"');
                }
            }
        });
    });

    if (allProducts[name]) {
        

    }
    else {
        db.transaction(t => {
            t.executeSql('INSERT INTO products (id,type,brand,size,price,quantity) VALUES (?,?,?,?,?,?)', [name, type, brand, size, price, quantity]);

        });

    }

}


