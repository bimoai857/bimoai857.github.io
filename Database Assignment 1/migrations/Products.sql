CREATE TABLE Products (
  ProductID SERIAL PRIMARY KEY,
  ProductName VARCHAR(255),
  SupplierID INT,
  CategoryID INT,
  Unit VARCHAR(255),
  Price NUMERIC(10,2),
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
  FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

