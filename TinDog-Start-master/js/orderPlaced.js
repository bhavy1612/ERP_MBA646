function orderPlaced(event){
    const elements = document.getElementById("orderForm").elements;
    var obj ={};
      for(var i = 0 ; i < elements.length ; i++){
          var item = elements.item(i);
          obj[item.name] = item.value;
      }


    var d = new Date().toISOString();
    
    var orderSubmitted = {
      Phone_Number: obj['orderphoneno'],
      Material_ID: obj['ordermaterialid'],
      Quantity: obj['orderquantity'],
      Price: obj['orderprice'],
      Date_of_order: d.split('T')[0]
    };

    fetch('http://localhost:3002/orders',{
      method: 'POST',
      body: JSON.stringify(orderSubmitted),
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => response.json())
    .then(response => {
        var Challan_No_Obtained = response[0].Challan_No;
        
        fetch(`http://localhost:3002/inventorystock/${orderSubmitted.Material_ID}`)
        .then(response => response.json())
        .then(response => {

            var d = new Date(orderSubmitted.Date_of_order);
            var format_date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear(); 
        
            var outtable = document.getElementById("orderTable");
            var row  = outtable.insertRow(1);
            row.insertCell(0).innerHTML =  Challan_No_Obtained;
            row.insertCell(1).innerHTML =  response[0].Material_Name;
            row.insertCell(2).innerHTML =  orderSubmitted.Quantity;
            row.insertCell(3).innerHTML =  orderSubmitted.Price;
            row.insertCell(4).innerHTML =  orderSubmitted.Phone_Number;
            row.insertCell(5).innerHTML =  format_date;                
        })
        .catch(err=> console.log(err));
   })
    .catch(error => console.log(error));
    event.preventDefault();
  }

  const ordform = document.getElementById('orderForm');
  ordform.addEventListener('submit', orderPlaced);

