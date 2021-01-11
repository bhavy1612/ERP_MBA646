function addNewMaterial(event){
    const elements = document.getElementById("materialForm").elements;
    var obj ={};
      for(var i = 0 ; i < elements.length ; i++){
          var item = elements.item(i);
          obj[item.name] = item.value;
      }

    var newmatSubmitted = {
      Material_Name: obj['newmaterialname'],
      Current_Quantity: obj['newmaterialquantity'],
      Threshold_Quantity: obj['newmaterialthreshold']
    };
    
    fetch('http://localhost:3002/inventorystock',{
      method: 'POST',
      body: JSON.stringify(newmatSubmitted),
      headers: {
          "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
    .then(response => {
      if(response.status == '200'){
          var stockTable = document.getElementById("inventoryStock");
          var rowCount = stockTable.rows.length;

          var newRow = stockTable.insertRow(rowCount);
          
          newRow.insertCell(0).innerHTML = newmatSubmitted.Material_Name;
          newRow.insertCell(1).innerHTML = newmatSubmitted.Current_Quantity;
          newRow.insertCell(2).innerHTML = newmatSubmitted.Threshold_Quantity;
      }
    })
    .catch(error => console.log(error));
     event.preventDefault();
};

var materialForm = document.getElementById('materialForm');
materialForm.addEventListener('submit',addNewMaterial);