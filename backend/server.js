const exp = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = exp();
app.use(exp.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "easysell"
});

app.get("/signup", (req,res) => {
    
});

app.post("/login", (req,res) => {

    //search data in database
    const sql1 = "SELECT * FROM Users WHERE userId = ?"; 
    const sql2 = "SELECT * FROM Users WHERE userId = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];

    db.query(sql1, req.body.email, (err, data) => {
        if(err) {
            return res.json(err);
        }
        else {
            if(data.length > 0) {
                db.query(sql2, values, (err, data) => {
                    if(err) {
                        return res.json(err);
                    }
                    else {
                        if(data.length > 0) {
                            return res.json("Success!");
                        }
                        else {
                            return res.json("Wrong password!");
                        }
                    }
                });            
            }
            else {
                return res.json("No account present!");
            }
        }
    });
});

app.listen(8081, () => {
    console.log('app is running on port 8081');
});