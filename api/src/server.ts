import express from 'express';
import { Router } from "express";
import { deleteData, getData, getDataById, insertData, updateData } from './parking';

const app = express();

const route = Router();

app.use(express.json());

// Middleware to handle CORS (for development, you might want to configure this properly)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

route.route('/api/data')
  .get(getData);

route.route('/api/data/:state')
  .post(insertData);

route.route('/api/data/:state/:id')
  .get(getDataById)
  .put(updateData)
  .delete(deleteData);

app.use(route);
app.listen(3333, () => console.log('Server is running on port 3333!'));