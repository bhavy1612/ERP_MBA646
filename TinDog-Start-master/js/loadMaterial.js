fetch("http://localhost:3002/inventorystock")
.then(response => response.json())
.then( response => {
        response.map((item) => {
        var dropdown = document.getElementById("material_name");
        var option = document.createElement('option');
        option.value = item.Material_ID;
        option.text = item.Material_Name;
        option.name = item.Material_Name;
        dropdown.add(option);

        var dropdown = document.getElementById("material_name1");
        var option = document.createElement('option');
        option.value = item.Material_ID;
        option.text = item.Material_Name;
        option.name = item.Material_Name;
        dropdown.add(option);

        var dropdown = document.getElementById("material_name2");
        var option = document.createElement('option');
        option.value = item.Material_ID;
        option.text = item.Material_Name;
        option.name = item.Material_Name;
        dropdown.add(option);

        var stockTable = document.getElementById("inventoryStock");
        var rowCount = stockTable.rows.length;

        var newRow = stockTable.insertRow(rowCount);
          
        newRow.insertCell(0).innerHTML = item.Material_Name;
        newRow.insertCell(1).innerHTML = item.Current_Quantity;
        newRow.insertCell(2).innerHTML = item.Threshold_Quantity;
        return '';
    })
})
.catch(err => console.log(err));

fetch('http://localhost:3002/inventoryout')
    .then(response =>response.json())
    .then(response => {
        response.map(item => {
            var outTable = document.getElementById("outTable");
            var rowCount = outTable.rows.length;
    
            var newRow = outTable.insertRow(rowCount);

            var date_feature = new Date(item.Date_);
            var date_ = date_feature.getDate()+'/'+(date_feature.getMonth()+1)+'/'+date_feature.getFullYear();

            newRow.insertCell(0).innerHTML = item.Material_Name;
            newRow.insertCell(1).innerHTML = item.Demanded_Quantity;
            newRow.insertCell(2).innerHTML = item.Verified_by;
            newRow.insertCell(3).innerHTML = date_;  
            return '';
        })
    })
    .catch(error => console.log(error));


fetch('http://localhost:3002/demands')
.then(response => response.json())
.then(response => {
    var demandTable = document.getElementById('demandTable');
    for(var i = 1; i <= response.length ; i++){

        var d = response[i-1].Date_of_order ? new Date(response[i-1].Date_of_order): null;
        var format_date = d ? d.getDate() + '/'+(d.getMonth()+1)+'/'+d.getFullYear() : ''; 
        var newRow = demandTable.insertRow(i);
        newRow.insertCell(0).innerHTML = response[i-1].Material_Name;
        newRow.insertCell(1).innerHTML = response[i-1].Quantity;
        newRow.insertCell(2).innerHTML = response[i-1].Verified_by;
        newRow.insertCell(3).innerHTML = format_date;
        
    }
})
.catch(err => console.log(err));


fetch('http://localhost:3002/orders')
.then(response => response.json())
.then(response => {
    var demandTable = document.getElementById('orderTable');
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
