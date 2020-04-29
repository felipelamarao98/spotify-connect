import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import indexRouter from "./routes/indexRouter";

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/',indexRouter);

app.listen(3000,()=>{
    console.log('TAMO DE PÉ KRAIO');
})


export default app;