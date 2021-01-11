function demandSubmit(event){
    const elements = document.getElementById("myForm").elements;
    var obj ={};
      for(var i = 0 ; i < elements.length ; i++){
          var item = elements.item(i);
          obj[item.name] = item.value;
      }
    
    var d = new Date().toISOString();

    var newDemandSubmitted = {
      Material_Id: obj['demandmaterialid'],
      Quantity: obj['demandquantity'],
      Date_of_demand: d.split('T')[0],
      Verified_by_name: obj['demandName']
    };

    fetch('http://localhost:3002/demands',{
      method: 'POST',
      body: JSON.stringify(newDemandSubmitted),
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => {
        if(response.status == '200'){

        var d = new Date(newDemandSubmitted.Date_of_demand);
        var format_date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear(); 
        
        fetch(`http://localhost:3002/inventorystock/${newDemandSubmitted.Material_Id}`)
        .then(response => response.json())
        .then(response => {
          var outtable = document.getElementById("demandTable");
          var row  = outtable.insertRow(1);
          row.insertCell(0).innerHTML =  response[0].Material_Name;
          row.insertCell(1).innerHTML =  newDemandSubmitted.Quantity;
          row.insertCell(2).innerHTML =  newDemandSubmitted.Verified_by_name;
          row.insertCell(3).innerHTML =  format_date;
          updatingInventoryStock();
          
        })
        .catch(err=> console.log(err));

        }
    })
    .catch(error => console.log(error));
    event.preventDefault();
  }

  const form = document.getElementById('myForm');
  form.addEventListener('submit', demandSubmit);
