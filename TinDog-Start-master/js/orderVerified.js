
function deleteRow(){
    var node = document.getElementById("ordertbody");
        while (node && node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    var node = document.getElementById("inventorytbody");
        while (node && node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    var node = document.getElementById("inventorystocktbody");
        while (node && node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    
    
}


function loadInventoryTableAfterUpdation(){
    fetch('http://localhost:3002/inventoryin')
    .then(response => response.json())
    .then(response => {
            var demandTable = document.getElementById('inventoryinTable');
            for(var i = 1; i <= response.length ; i++){

            var d = response[i-1].Date_of_order ? new Date(response[i-1].Date_of_order): null;
            var format_date = d ? d.getDate() + '/'+(d.getMonth()+1)+'/'+d.getFullYear() : ''; 
            
            var d_ = response[i-1].Date_of_Delivery ? new Date(response[i-1].Date_of_Delivery): null;
            var format_date_ = d ? d.getDate() + '/'+(d.getMonth()+1)+'/'+d.getFullYear() : ''; 
            

            var newRow = demandTable.insertRow(i);
            newRow.insertCell(0).innerHTML = response[i-1].Material_Name;
            newRow.insertCell(1).innerHTML = response[i-1].Quantity;
            newRow.insertCell(2).innerHTML = format_date
            newRow.insertCell(3).innerHTML = format_date_;
            newRow.insertCell(4).innerHTML = response[i-1].Verified_by;        
    }
})
.catch(err => console.log(err));
};


function loadOrderTableAfterUpdation(){
    fetch('http://localhost:3002/orders')
        .then(response => response.json())
        .then(response => {
            var demandTable = document.getElementById('orderTable');
            demandTable.getElementsByTagName('tbody').innerHTML = '';
            for(var i = 1; i <= response.length ; i++){
        
                var d = response[i-1].Date_of_order ? new Date(response[i-1].Date_of_order): null;
                var format_date = d ? d.getDate() + '/'+(d.getMonth()+1)+'/'+d.getFullYear() : ''; 
                var newRow = demandTable.insertRow(i);
                newRow.insertCell(0).innerHTML = response[i-1].Challan_No;
                newRow.insertCell(1).innerHTML = response[i-1].Material_Name;
                newRow.insertCell(2).innerHTML = response[i-1].Quantity;
                newRow.insertCell(3).innerHTML = response[i-1].Price;
                newRow.insertCell(4).innerHTML = response[i-1].Phone_Number;
                newRow.insertCell(5).innerHTML = format_date;
                
            }
        })
        .catch(err => console.log(err));
};


function updatingInventoryStock(){
    fetch('http://localhost:3002/inventorystock')
      .then(response => response.json())
      .then(response => {
            var stockTable = document.getElementById("inventoryStock");
            stockTable.getElementsByTagName('tbody').innerHTML = '';
            for(var i = 1; i < response.length; i++){
              var newRow = stockTable.insertRow(i);
              
              newRow.insertCell(0).innerHTML = response[i-1].Material_Name;
              newRow.insertCell(1).innerHTML = response[i-1].Current_Quantity;
              newRow.insertCell(2).innerHTML = response[i-1].Threshold_Quantity;
        }
      })
      .catch(error => console.log(error));
};
  

function orderVerified(event){
    const elements = document.getElementById('verifyForm').elements;
    var obj ={};
      for(var i = 0 ; i < elements.length ; i++){
          var item = elements.item(i);
          obj[item.name] = item.value;
      }
      var d = new Date().toISOString();
      var verifyByObj = {
      Challan_No: obj['orderverfiychalan'],
      Verified_by: obj['orderverifyname'],
      Date: d.split('T')[0],
    };

    fetch("http://localhost:3002/inventoryin",{
            method: 'POST',
            body: JSON.stringify(verifyByObj),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
         })
        .then(response => {
            if(response.status == '200'){
                deleteRow();
                loadInventoryTableAfterUpdation();
                loadOrderTableAfterUpdation();
                updatingInventoryStock();
            }
            
        })
        .catch(err => console.log(err));  
        event.preventDefault();  
}

const orderForm = document.getElementById('verifyForm')
orderForm.addEventListener('submit',orderVerified);

