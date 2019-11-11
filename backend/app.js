const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var cors = require('cors');

const app = express();

// Create connection
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Pdi!1225',
  database : 'inventory'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySql Connected...');
});
global.db = db;

app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Cross DATA
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// POST Transaction
app.post("/postTransaction", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'INSERT INTO transactions (transactions_id, Supplier_Code, PDI_Code, Description, Employee, Mvt, Quantity, Handling_Unit, Location, Created_Date, Resturant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [post.transId, post.supplier_code, post.pdi_code, post.descrpt, post.employee, post.mvt, post.qty, post.unit, post.location, post.date, post.rest], function (err, result) {
    if (err) throw err;
    console.log('1 Transaction Inserted!');
  });
  res.status(201).json({
    message: 'true'
  });
});

// GET Transactions
app.get('/getTransaction', (req, res) => {
  let sql = 'SELECT * FROM transactions';
  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(201).json({
      message: "Transactions fetched successfully!",
      posts: results
    });
  });
});

// DELETE Transaction
app.post("/deleteTransaction", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'DELETE FROM transactions WHERE transactions_id = ?';
  db.query(sql, [post[0]], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// GET Inventory
app.get('/getInventory', (req, res) => {
  let sql = 'SELECT * FROM inventory';
  db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Inventory fetched successfully!",
      posts: results
    });
  });
});

// GET Individual Inventory
app.get('/getInventory/:id', (req, res) => {
  let sql = 'SELECT * FROM inventory WHERE PDI_Code = ?';
  db.query(sql, [req.params.id], (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Inventory fetched successfully!",
      posts: results
    });
  });
});

// POST Inventory
app.post("/postInventory", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'INSERT INTO inventory (PDI_Code, Ctg_Code, Item, Category, Description, Supplier, Handling_Unit, Location, Qty, Price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [post.pdi_code, post.ctg_code, post.item, post.ctg, post.descrpt, post.supplier, post.unit, post.location, post.qty, post.price], function (err, result) {
    if (err) throw err;
    console.log('1 Inventory Inserted!');
  });
  res.status(201).json({
    message: 'Inventory added successfully'
  });
});

// UPDATE Inventory
app.post("/updateInventory", (req, res, next) => {
  const qty = req.body[0];
  const pdi_code = req.body[1];
  console.log(qty, pdi_code);
  let sql = 'UPDATE inventory SET Qty = ? WHERE PDI_Code = ?';
  db.query(sql, [qty, pdi_code], function (err, result) {
    if (err) throw err;
    console.log(qty, pdi_code);
    console.log('1 Inventory Updated!');
  });
  res.status(201).json({
    message: 'Inventory updated successfully'
  });
});

// UPDATE Inventory Edit
app.post("/updateInventoryEdit", (req, res, next) => {
  const descrpt = req.body[0];
  const supplier = req.body[1];
  const unit = req.body[2];
  const location = req.body[3];
  const qty = req.body[4];
  const price = req.body[5];
  const pdi_code = req.body[6];
  console.log(qty, pdi_code);
  let sql = 'UPDATE inventory SET Description = ?, Supplier = ?, Handling_Unit = ?, Location = ?, Qty = ?, Price = ? WHERE PDI_Code = ?';
  db.query(sql, [descrpt, supplier, unit, location, qty, price, pdi_code], function (err, result) {
    if (err) throw err;
    console.log(descrpt, supplier, unit, location, qty, price, pdi_code);
    console.log('1 Inventory Updated!');
  });
  res.status(201).json({
    message: 'Inventory updated successfully'
  });
});

// DELETE Inventory
app.post("/deleteInventory", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'DELETE FROM inventory WHERE PDI_Code = ?';
  db.query(sql, [post[0]], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// GET Code_Translation
app.get('/getTranslation', (req, res) => {
  let sql = 'SELECT * FROM info_record';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Code Translation fetched successfully!",
      posts: results
    });
  });
});

// GET Individual Translation
app.get('/getTranslation/:id', (req, res) => {
  let sql = 'SELECT * FROM info_record WHERE Supply_Code = ?';
  db.query(sql, [req.params.id], (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Translation fetched successfully!",
      posts: results
    });
  });
});

// POST Translation
app.post("/postTranslation", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'INSERT INTO info_record (info_record_id, PDI_Code, Supply_Code, Description, Supplier, Price) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [post.translation_id, post.pdi_code, post.supply_code, post.descrpt, post.supplier, post.price], function (err, result) {
    if (err) throw err;
    console.log('1 Translation Inserted!');
  });
  res.status(201).json({
    message: 'Translation added successfully'
  });
});

// DELETE Translation
app.post("/deleteTranslation", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'DELETE FROM info_record WHERE Supply_Code = ?';
  db.query(sql, [post[0]], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// UPDATE Translation Edit
app.post("/updateTranslationEdit", (req, res, next) => {
  const supply_code = req.body[0];
  const descrpt = req.body[1];
  const supplier = req.body[2];
  const price = req.body[3];
  console.log(supply_code);
  let sql = 'UPDATE info_record SET Description = ?, Supplier = ?, Price = ? WHERE Supply_Code = ?';
  db.query(sql, [descrpt, supplier, price, supply_code], function (err, result) {
    if (err) throw err;
    console.log(supply_code, descrpt, supplier, price);
    console.log('1 Translation Updated!');
  });
  res.status(201).json({
    message: 'Translation updated successfully'
  });
});

// GET Location
app.get('/getLocation', (req, res) => {
  let sql = 'SELECT * FROM location';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Location fetched successfully!",
      posts: results
    });
  });
});

// GET Mvt
app.get('/getMvt', (req, res) => {
  let sql = 'SELECT * FROM mvt';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "MVT fetched successfully!",
      posts: results
    });
  });
});

// GET Name
app.get('/getName', (req, res) => {
  let sql = 'SELECT * FROM names';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Names fetched successfully!",
      posts: results
    });
  });
});

// POST Name
app.post("/postName", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'INSERT INTO names (Name) VALUES (?)';
  db.query(sql, [post.name], function (err, result) {
    if (err) throw err;
    console.log('1 Employee Inserted!');
  });
  res.status(201).json({
    message: 'Employee added successfully'
  });
});

// DELETE Name
app.post("/deleteName", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'DELETE FROM names WHERE Name = ?';
  db.query(sql, [post[0]], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// GET Restaurant
app.get('/getRestaurant', (req, res) => {
  let sql = 'SELECT * FROM restaurant';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Restaurant fetched successfully!",
      posts: results
    });
  });
});

// POST Restaurant
app.post("/postRestaurant", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'INSERT INTO restaurant (No, Restaurant) VALUES (?, ?)';
  db.query(sql, [post.no, post.rest], function (err, result) {
    if (err) throw err;
    console.log('1 Restaurant Inserted!');
  });
  res.status(201).json({
    message: 'Restaurant added successfully'
  });
});

// DELETE Restaurant
app.post("/deleteRestaurant", (req, res, next) => {
  const post = req.body;
  console.log(post);
  let sql = 'DELETE FROM restaurant WHERE Restaurant = ?';
  db.query(sql, [post[0]], function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

// GET Category Code
app.get('/getCategoryCode', (req, res) => {
  let sql = 'SELECT * FROM category_code';
  let query = db.query(sql, (err, results, fields) => {
    if (err) throw err;
    res.status(200).json({
      message: "Category Code fetched successfully!",
      posts: results
    });
  });
});

app.listen('3000', () =>{
  console.log('Server started on port 3000!');
});
