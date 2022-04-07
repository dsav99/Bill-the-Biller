db.transaction(t=>{
    t.executeSql('SELECT * FROM orders',[],function(t,results){
        // console.log(results.rows);
    });
})



db.transaction(t => {
    t.executeSql(`SELECT SUM(total) FROM orders`, [], function (t, results) {
        let total = results.rows[0]['SUM(total)'];
        total = new Intl.NumberFormat('en-IN').format(total);

        document.getElementById('total-sales').innerHTML = `${total}`;
        // console.log(total);

    });
});

db.transaction(t=>{
    t.executeSql('SELECT COUNT(customerId) AS count FROM customers',[],function(t,results){
        // console.log(results.rows[0]['count']);
        let customerCount = results.rows[0]['count'];
        customerCount = new Intl.NumberFormat('en-IN').format(customerCount);
        document.getElementById('total-customers').innerHTML=customerCount;
    });

    


    let monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0,0,0,0);
   monthStart = monthStart.toLocaleString();
  
    
    t.executeSql(`SELECT COUNT(*) FROM orders WHERE date>="${monthStart}"`,[],function(t,results){
        
        document.getElementById('new-clients').innerHTML = results.rows[0]['COUNT(*)'];
        // for(let i=0;i<results.rows.length;i++){
        //     if(monthStart<results.rows[i].date){
        //         console.log(results.rows[i]);
        //     }
        // }
    })
    
})

db.transaction(t =>{
    t.executeSql(`SELECT price ,quantity FROM products`,[],function(t,results){
        let total=0;
        for(let i=0;i<results.rows.length;i++){
            total+=((results.rows[i].price)*(results.rows[i].quantity));
        }

        total = new Intl.NumberFormat('en-IN').format(total);
        document.getElementById('total-inventory').innerHTML=total;
    })
})


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        'X-RapidAPI-Key': 'e64b538230msh00bbd2aa8b989fdp152058jsn05f4d224c600'
    }
};

// fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Amritsar', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


// console.log(navigator.geolocation.getCurrentPosition(showPosition));


// navigator.geolocation.getCurrentPosition(function(position){
//     return new Promise((resolve,reject)=>{
        
//     })
// }).then(response =>{
//     console.log(response);
// })

// const myPromise = new Promise((resolve,reject) =>{
//     resolve(navigator.geolocation.getCurrentPosition(showPosition));
// })

// function showPosition(position){
//     return position;
// }

// myPromise.then((value)=>{
//     console.log("HH");
//     console.log(value);
// })

const date  = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    document.getElementById('current-time').innerHTML=`${hour} : ${minute}`;

setInterval(()=>{
    const date  = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    document.getElementById('current-time').innerHTML=`${hour} : ${minute}`;
    printLocation();

},60000);

printLocation();

async function printLocation(){
    const result = await  new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition(resolve,reject);
    });

    fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${result.coords.latitude},${result.coords.longitude}`, options)
    .then(response => response.json())
    .then(response => {
        const currentTemp_C = response.current.temp_c;
        const location = response.location.name;
        const icon = response.current.condition.icon;

        document.getElementById('weather-city').innerHTML=location;
        document.getElementById('current-weather-icon').setAttribute('src',icon);
        document.getElementById('current-temp').innerHTML=`${currentTemp_C} <sup>o</sup> C`;

        
    })
    .catch(err => console.error(err));
    

   
}


