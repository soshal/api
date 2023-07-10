const express = require("express");
const Path = require("path");
const bodyparser = require("body-parser");
const app = express();
const https = require("https");


app.use(bodyparser.urlencoded({extended: true}));

app.get("/about", (req, res) => {
    res.sendFile(Path.join(__dirname,"/signup.html"));
});




app.post("/about", (req, res) => {
    var firstname=req.body.first_name;
    var lastname=req.body.last_name;
    var email=req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
          var jsonData = JSON.stringify(data);
          
          const url = "https://us21.api.mailchimp.com/3.0/lists/b701c20702";
          var options = {
                
                method: "POST",
                auth: "soshal:3ff1872eb1bd2d243c4d34875347bd63-us21"
          }
            const request = https.request(url, options, function(response){
                if(response.statusCode === 200){
                    res.sendFile(Path.join(__dirname,"/success.html"));
                }else{
                    res.sendFile(Path.join(__dirname,"/file.html"));
                }   



                response.on("data", function(data){
                    console.log(JSON.parse(data));
                });
            });
            request.write(jsonData);
            request.end();
            }


);


app.listen( process.env.PORT||3000, () => {
    console.log("Server is running on port 3000");
});

//3ff1872eb1bd2d243c4d34875347bd63 -us21
//list id
//b701c20702
