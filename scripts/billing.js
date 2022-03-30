// const db = openDatabase('Clothing-shop', '1.0', 'data', 1 * 1024 * 1024);
if (!JSON.parse(sessionStorage.getItem('cart'))) {
    sessionStorage.setItem('cart', JSON.stringify({cartTotal:0}));
}


db.transaction(t => {
    t.executeSql('CREATE TABLE IF NOT EXISTS (id INT, type TEXT, brand TEXT,size TEXT, price NUMBER) ');
});

let products = {};
let orderId =0 ;
db.transaction(t=>{
    t.executeSql(`SELECT COUNT(*) FROM orders`,[],function(t,results){
        orderId = results.rows[0]['COUNT(*)']+1;
        
    })
})



db.transaction(t=>{
    t.executeSql('SELECT * FROM orders',[],function(t,results){
        console.log(results.rows);
    })
})
db.transaction(t => {

    t.executeSql(`SELECT * FROM products`, [], function (t, results) {
        for (let i in results.rows) {
            products[results.rows[i].id] = {
                type: results.rows[i].type,
                brand: results.rows[i].brand,
                size: results.rows[i].size,
                price: results.rows[i].price

            }
        }
    })
})




document.getElementById('new-item-id').addEventListener('keyup', function () {

    const id = this.value.toUpperCase();
    db.transaction(t => {
        t.executeSql('SELECT * from products WHERE id="' + id + '"', [], function (t, results) {
            if (results.rows.length !== 0) {
                document.querySelector('.new-item').style.display = 'flex';
                const product = results.rows[0];
                // console.log(product);
                document.querySelector('.new-item .item-description').innerHTML = product.brand + ' ' + product.type;
            }
            else {
                document.querySelector('.new-item').style.display = 'none';
            }
        })
    })
});


updateCart();


function updateCart() {
    let cartItems = JSON.parse(sessionStorage.getItem('cart'));
    // console.log(cartItems);
    document.getElementById('total-cart').innerHTML=cartItems.cartTotal;
    document.getElementById('cart-items').innerHTML = '';
    for (let i in cartItems) {

        db.transaction(t => {
            t.executeSql(`SELECT * FROM products WHERE id='${i}'`, [], function (t, results) {
                if (results.rows.length === 0) {

                }
                else {

                    if(cartItems[i]>0){
                    const currentItem = results.rows[0];


                    const item = document.createElement('div');
                    item.setAttribute('class', 'cart-item');
                    item.setAttribute('id',i);
                    const description = document.createElement('div');
                    description.setAttribute('class', 'item-description');
                    const deleteButton = document.createElement('button');
                    deleteButton.addEventListener('click',function(){
                        const cart = JSON.parse(sessionStorage.getItem('cart'));
                        if(cart[this.parentElement.parentElement.id]>0){
                            cart.cartTotal-=currentItem.price;
                            cart[this.parentElement.parentElement.id]-=1;
                            
                        }
                        sessionStorage.setItem('cart',JSON.stringify(cart));
                        updateCart();
                        console.log(cart[this.parentElement.parentElement.id]);
                       console.log(this.parentElement.parentElement.id);
                    });
                    const deleteImage = document.createElement('img');
                    deleteImage.setAttribute('src', '/icons/bin.SVG');
                    deleteButton.append(deleteImage);
                    description.append(deleteButton);
                    const desPara = document.createElement('p');
                    desPara.innerHTML = cartItems[i] + 'x ' + currentItem.brand + ' ' + currentItem.type;
                    description.append(desPara);


                    const price = document.createElement('div');
                    price.setAttribute('class', 'item-price');
                    price.innerHTML = 'Rs.' + currentItem.price;

                    item.append(description);
                    item.append(price);
                    document.getElementById('cart-items').append(item);
                    }

                }
            });
        })

    }
};


function addItem() {


    let productId = document.getElementById('cart-form').elements[0].value.toUpperCase();

    let productQuantity = parseInt(document.getElementById('cart-form').elements[1].value || 1);
    
    document.getElementById('cart-form').elements[0].value = '';
    document.getElementById('cart-form').elements[1].value = '';

    const currentCart = JSON.parse(sessionStorage.getItem('cart'));
    let cartTotal = currentCart.cartTotal;
    if (!currentCart[productId]) {
        currentCart[productId] = productQuantity;

    }
    else {
        currentCart[productId] += productQuantity;
    }

    

    cartTotal += products[productId].price * productQuantity;
    currentCart.cartTotal=cartTotal;
    
    sessionStorage.setItem('cart', JSON.stringify(currentCart));

    document.querySelector('.new-item').style.display = 'none';

    updateCart();
}



function generateBill() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    

    const customerName = document.getElementById('customer-name-form').elements[0].value;
    if (customerName === '') {
        alert('Enter a name');
        return;
    }
   

    db.transaction(t=>{
        t.executeSql(`CREATE TABLE IF NOT EXISTS orders (orderId NUMBER, name TEXT, datePlaced TEXT,total NUMBER, cart TEXT )`);
        t.executeSql(`INSERT INTO orders VALUES(?,?,?,?,?)`,[orderId,customerName,new Date().toLocaleString(),cart.cartTotal,JSON.stringify(cart)]);
    })


    sessionStorage.setItem('cart', JSON.stringify({cartTotal:0}));
    alert('Bill prepared to print and cart cleared!')
    updateCart();
}
