import 'dotenv/config';
import connectDatabase from './config/db.config.js';

import app from './app.js';


const port = process.env.PORT || 2003;
connectDatabase().then(()=> {
    app.listen(port,()=> {
        console.log(`Server Started on PORT ${port} !`);
    });
}).catch((error)=>{
    console.log("Database Connection LOST : ", error);
    process.exit(1);
});
