
db.transaction(t=>{
    t.executeSql('SELECT * FROM customers',[],function(t,results){
        console.log(results.rows);
        for(let i=0;i<results.rows.length;i++){
        //     <div id="customers">
        //     <div id="customers-headers">
        //         <h2>Customers</h2>
        //     </div>
        //     <div id="customers-items">
        //         <table id="customers-table">
        //             <th>Customer ID</th>
        //             <th>Customer Name</th>
        //             <th>Address</th>
        //             <th>Phone</th>
        //             <th>Email</th>

                    
        //         </table>
                
        //     </div>
        // </div>

            const customer = document.createElement('tr');
            customer.setAttribute('class','customer');

            const id = document.createElement('td');
            id.innerHTML = results.rows[i].customerId;
            const name = document.createElement('td');
            name.innerHTML = results.rows[i].customerName;
            const address = document.createElement('td');
            address.innerHTML="Amritsar";
            const phone = document.createElement('td');
            phone.innerHTML="5107475166"
            const email = document.createElement('td');
            email.innerHTML="savidsav99@gmail.com";

            customer.append(id);
            customer.append(name);
            customer.append(address);
            customer.append(phone);
            customer.append(email);

            document.getElementById('customers-table').append(customer)
        }
    })
})