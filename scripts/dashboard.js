db.transaction(t=>{
    t.executeSql(`SELECT SUM(total) FROM orders`,[],function(t,results){
        let total = results.rows[0]['SUM(total)'];
        total = new Intl.NumberFormat('en-IN').format(total);
        
        document.getElementById('total-sales').innerHTML=`${total}`;
        console.log(total);
        
    });
})