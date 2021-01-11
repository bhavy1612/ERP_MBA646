document.getElementById("filterbutton").addEventListener("click", myFunction);

function myFunction() {
    fetch("http://localhost:3002/updateinventin")
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
    
            var stockTable = document.getElementById("warninginventoryStock");
            var rowCount = stockTable.rows.length;
    
            var newRow = stockTable.insertRow(rowCount);
              
            newRow.insertCell(0).innerHTML = item.Material_Name;
            newRow.insertCell(1).innerHTML = item.Current_Quantity;
            newRow.insertCell(2).innerHTML = item.Threshold_Quantity;
            return '';
        })
    })
    .catch(err => console.log(err));

    var foo = document.getElementById('filterinventory');
    foo.style.display = 'block';
}