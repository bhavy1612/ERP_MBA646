CREATE TABLE Supplier_Order
(
  Challan_No INT Auto_Increment,
  Phone_Number NUMERIC(10) NOT NULL,
  Material_ID  VARCHAR(255) NOT NULL,
  Quantity FLOAT NOT NULL,
  Price Float NOT NULL,
  Date_of_order Date,
  Received boolean not null default 0,
  Primary Key(Challan_No)
  
);

Create TABLE Inventory_In
(
  Entry_No INT Auto_Increment,
  Challan_No INT NOT NULL,
  Verified_by VARCHAR(255),
  Date_of_Delivery DATE,
  Primary Key(Entry_No)
);

Create TABLE Inventory_Stock
(
  Material_ID  INT NOT NULL AUTO_INCREMENT,
  Material_Name VARCHAR(255) NOT NULL ,
  Current_Quantity FLOAT NOT NULL,
  Threshold_Quantity FLOAT NOT NULL,
  PRIMARY KEY(Material_ID)
);

CREATE TABLE Demand_List
(
  Entity_Id INT NOT NULL AUTO_INCREMENT,		
  Material_ID  INT NOT NULL,
  Quantity FLOAT NOT NULL,
  Demand_recieved BOOLEAN, 
  Verified_by VARCHAR(255) NOT NULL,
  Date_of_order DATE,
  PRIMARY KEY(Entity_Id)
);


Create TABLE Inventory_Out
(
  Entry_No INT auto_increment,
  Date_ Date,
  Time_ Time,
  Material_ID  INT NOT NULL,
  Verified_by VARCHAR(255) NOT NULL,
  Check_out BOOLEAN,
  Demanded_Quantity FLOAT NOT NULL,
  primary key(Entry_No)
);



