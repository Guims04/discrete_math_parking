import { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

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
  const state = parseInt(req.params.state, 10);
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const data: Park[][] = JSON.parse(fileContent);
    const newItem = req.body;
    newItem.id = data.length + 1;
    data[state].push(newItem);
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
    res.status(201).json(newItem);
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
    const newData = data[state].filter((item) => item.id !== id);
    if (newData.length < data.length) {
      await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
}