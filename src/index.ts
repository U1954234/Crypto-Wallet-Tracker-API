import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors'
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.use(cors())
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false, }));
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
export default app
