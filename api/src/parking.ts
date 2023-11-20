import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { checkStates, subHour } from "./service";

const dataFilePath = path.join(__dirname, 'database.json');

export type Park = {
  id: number,
  license_plate: string,
  entry_time: string,
  exit_time?: string
}

export const getData = async (req: Request, res: Response) => {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading data' });
  }
}

export const getDataById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const state = parseInt(req.params.state, 10);
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data: Park[][] = JSON.parse(fileContent);
    const item = data[state].find((item) => item.id === id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error reading data' });
  }
}

export const insertData = async (req: Request, res: Response) => {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data: Park[][] = JSON.parse(fileContent);
    const newItem = req.body;

    const state = checkStates(newItem.license_plate);

    newItem.id = data[state.code].length ? data[state.code][data[state.code].length-1].id + 1 : 1;
    data[state.code].push(newItem);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    res.status(201).json(state);
  } catch (error) {
    res.status(500).json({ error: 'Error adding data' });
  }
}

export const updateData = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const state = parseInt(req.params.state, 10);
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    let data: Park[][] = JSON.parse(fileContent);
    const index = data[state].findIndex((item) => item.id === id);
    if (index !== -1) {
      data[state][index] = { ...data[state][index], ...req.body };
      await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
      res.status(200).json(data[state][index]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
}

export const deleteData = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const state = parseInt(req.params.state, 10);
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    let data: Park[][] = JSON.parse(fileContent);
    let newData = data;
    const oldLength = data[state].length;

    const car: Park[] = data[state].filter((item) => item.id === id);

    const time: string = subHour(car[0].exit_time ?? "", car[0].entry_time);
    const hour: number = parseInt(time.split(":")[0]);
    const minutes: number = parseInt(time.split(":")[1]);

    console.log(time);

    // Ceil (função teto)
    let result;
    if (minutes <= 15 && hour == 0) result = -1;
    else if (minutes == 0) result = hour;
    else result = hour + 1;

    // formula
    let value: number;
    if (result <= 3 && result != -1) value = 7;
    else if (result === -1) value = 0;
    else value = 7 + ((result - 3) * 2.50);

    newData[state] = data[state].filter((item) => item.id !== id);
    if (newData[state].length < oldLength) {
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
      res.status(200).json({ value });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting data' });
  }
}