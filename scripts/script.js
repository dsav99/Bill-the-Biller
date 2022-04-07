const db = openDatabase('Clothing-shop', '1.0', 'data', 1 * 1024 * 1024);



// db.transaction(t=>{
//     t.executeSql('SELECT * FROM orders INNER JOIN customers ON orders.customerId = customers.customerId;',[],function(t,results){
//         console.log(results.rows);
//     })
// })

db.transaction(t=>{
    t.executeSql('CREATE TABLE IF NOT EXISTS customers (customerId NUMBER,customerName TEXT)');
    // t.executeSql('INSERT INTO customers VALUES (?,?,?)',[1,'SAVJOT',2])
})








function showMenu(){
    let currentValue = document.getElementById('menu').style.display;

    if(currentValue==='block'){
        document.getElementById('menu').style.display='none';
        document.getElementById('menu-status').setAttribute('src','/icons/menu.SVG')
    }
    else{
        document.getElementById('menu').style.display='block';
        document.getElementById('menu-status').setAttribute('src','/icons/menu-open.SVG')
    }
}


function displayUserProfile(){
    let currentValue = document.getElementById('user-profile').style.display;
    let settingsValue = document.getElementById('user-settings').style.display;

    if(currentValue==='block'){
        document.getElementById('user-profile').style.display='none';
    }
    else{
        if(settingsValue==='block'){
            document.getElementById('user-settings').style.display='none';
        }

        document.getElementById('user-profile').style.display='block';
    }
}

function displayUserSettings(){
    let currentValue = document.getElementById('user-settings').style.display;
    let profileValue = document.getElementById('user-profile').style.display;

    if(currentValue==='block'){
        document.getElementById('user-settings').style.display='none';
    }
    else{
        if(profileValue==='block'){
            document.getElementById('user-profile').style.display='none';
        }
        document.getElementById('user-settings').style.display='block';
    }
}

