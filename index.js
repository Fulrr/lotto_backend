const app = require('./app');
const db = require('./config/db');
const UserModel = require('./model/user.model');
const WalletModel = require('./model/wallet.model');

const port = 8081;

app.get('/',(req,res)=>{
    res.send("Hello World!!!!!")
});

app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`)
});