// const db = openDatabase('Clothing-shop', '1.0', 'data', 1 * 1024 * 1024);
db.transaction(t => {
    t.executeSql('SELECT * FROM orders)', [], function (t, results) {
        console.log(results.rows);
    })
});



db.transaction(t => {
    t.executeSql('SELECT orderId,name,datePlaced,total FROM orders', [], function (t, results) {
        for (let order in results.rows) {

            const currentOrder = results.rows[order];
            if (currentOrder.orderId !== undefined) {
                const tr = document.createElement('tr');
                tr.setAttribute('class', 'order');

                const id = document.createElement('td');
                const idButton = document.createElement('button');

                id.innerHTML = currentOrder.orderId;
                const name = document.createElement('td');
                const nameButton = document.createElement('button');
                nameButton.setAttribute('onclick', 'displayCustomerOrders(this.innerHTML)');
                name.append(nameButton);
                nameButton.innerHTML = currentOrder.name;
                const date = document.createElement('td');
                date.innerHTML = currentOrder.datePlaced;
                const total = document.createElement('td');
                total.innerHTML = currentOrder.total;

                tr.append(id);
                tr.append(name);
                tr.append(total);
                tr.append(date);

                document.getElementById("orders-table").append(tr);
            }
        }
    })
})



function displayCustomerOrders(customer) {
    document.getElementById('orders').style.opacity = 0;
    document.getElementById('customer-orders').style.display = 'block';
    document.getElementById('back-btn').style.display = 'block';

    db.transaction(t => {
        t.executeSql(`SELECT * FROM orders WHERE name ="${customer}"`, [], function (t, results) {
            const orderValue = results.rows;
            console.log(orderValue);
            document.querySelector('#custom-order-headers h2').innerHTML = customer;

            for (let i = 0; i < results.rows.length; i++) {

                const order = document.createElement('tr');
                order.setAttribute('class', 'order');

                const orderId = document.createElement('td');
                orderId.innerHTML = orderValue[i].orderId;
                const orderTotal = document.createElement('td');
                orderTotal.innerHTML = orderValue[i].total;
                const orderDate = document.createElement('td');
                orderDate.innerHTML = orderValue[i].datePlaced;
                const orderCart = document.createElement('td');
                const cartButton = document.createElement('button');
                cartButton.setAttribute('id', orderValue[i].orderId);
                cartButton.setAttribute('onclick', 'displayCart(this)');
                const cartImage = document.createElement('img');
                cartImage.setAttribute('src', '/icons/cart.SVG');
                cartImage.setAttribute('width', '25px');
                cartButton.append(cartImage);
                orderCart.append(cartButton);

                const d = document.createElement('div');
                d.setAttribute('class', 'cart-content');
                // d.setAttribute('id', orderValue[i].orderId);

                


                const cartItems = JSON.parse(orderValue[i].cart);
                for (let item in cartItems) {
                    if (item !== 'cartTotal') {
                        if (cartItems[item] !== 0) {
                            const p = document.createElement('p');  
                            p.innerHTML =  `${item} : ${cartItems[item]}`;   
                            d.append(p);         
                        }
                    }
                }
                orderCart.append(d);
                
                order.append(orderId);
                order.append(orderTotal);
                order.append(orderDate);
                order.append(orderCart);

                document.getElementById('custom-order-table').append(order);


            }
        })
    })

}



function myFunction() {
    
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('orders').style.opacity = 1;
    document.querySelector('#customer-orders').style.display = 'none';
    const table = document.querySelector('#custom-order-table');
    table.innerHTML = '';

    const a = document.createElement('th');
    a.innerHTML = 'ORDER ID';
    const b = document.createElement('th');
    b.innerHTML = 'TOTAL';
    const c = document.createElement('th');
    c.innerHTML = 'DATE PLACED';
    const d = document.createElement('th');
    d.innerHTML = 'CART';

    table.append(a);
    table.append(b);
    table.append(c);
    table.append(d);

}

function testFunction() {
    alert("JJJHF");
}

function displayCart(buttonId) {
    let currentValue = buttonId.parentElement.childNodes[1].style.display;
    if(currentValue==='block'){
        buttonId.parentElement.childNodes[1].style.display='none';
    }
    else{
        buttonId.parentElement.childNodes[1].style.display='block';
    }
}