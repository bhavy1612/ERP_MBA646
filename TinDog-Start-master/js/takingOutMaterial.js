
function updatingInventoryStock(){
  fetch('http://localhost:3002/inventorystock')
    .then(response => response.json())
    .then(response => {
          var stockTable = document.getElementById("inventoryStock");
          for(var i = 1; i < response.length; i++){
            var newRow = stockTable.insertRow(i);
            
            newRow.insertCell(0).innerHTML = response[i-1].Material_Name;
            newRow.insertCell(1).innerHTML = response[i-1].Current_Quantity;
            newRow.insertCell(2).innerHTML = response[i-1].Threshold_Quantity;
      }
    })
    .catch(error => console.log(error));
}






function outSubmit(event){
    const elements = document.getElementById("outForm").elements;
    var obj ={};
      for(var i = 0 ; i < elements.length ; i++){
          var item = elements.item(i);
          obj[item.name] = item.value;
      }
    
    var d = new Date().toISOString();
    var outSubmitted = {
      Date_of_entry: d.split('T')[0],
      Time_of_entry: d.split('T')[1].split('Z')[0],
      Material_ID: obj['outmaterialid'],
      Verified_by: obj['outverfname'],
      Demanded_Quantity: obj['outquantity']
    };

    fetch('http://localhost:3002/inventoryout',{
      method: 'POST',
      body: JSON.stringify(outSubmitted),
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => {
      if(response.status == '200'){
        var d = new Date(outSubmitted.Date_of_entry);
        var format_date = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear(); 

        var elements = document.getElementById("outForm").elements;

        fetch(`http://localhost:3002/inventorystock/${outSubmitted.Material_ID}`)
        .then(response => response.json())
        .then(response => {
          var outtable = document.getElementById("outTable");
          var row  = outtable.insertRow(1);
          row.insertCell(0).innerHTML =  response[0].Material_Name;
          row.insertCell(1).innerHTML =  outSubmitted.Demanded_Quantity;
          row.insertCell(2).innerHTML =  outSubmitted.Verified_by;
          row.insertCell(3).innerHTML =  format_date;
          updatingInventoryStock();
          
        })
        .catch(err=> console.log(err));
      }
    })
    .catch(error => console.log(error));
    event.preventDefault();
  }

  const outform = document.getElementById('outForm');
  outform.addEventListener('submit', outSubmit);
