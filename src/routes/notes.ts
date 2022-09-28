import express, { Request, Response } from "express";
import { ICategoryStatistic } from "../models/category";
import { IBaseNote, INote } from "../models/note";
import * as StatisticService from "../services/category";
import * as NoteService from "../services/notes";
import { Schemas, validate } from '../middleware/validator';

export const notesRouter = express.Router();

notesRouter.get("/stats", async (req: Request, res: Response) => {
    try {
        const statistic: ICategoryStatistic[] = await StatisticService.getCategoryStatistic();
        res.status(200).send(statistic);
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const notes: INote[] = await NoteService.findAll();
        res.status(200).send(notes);
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const item: INote | null = await NoteService.find(id);
        if (item) {
            return res.status(200).send(item);
        }
        res.status(404).send("item not found");
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.post("/", validate(Schemas.note), async (req: Request, res: Response) => {
    try {
        const item: IBaseNote = req.body;
        const newItem = await NoteService.create(item);

        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.patch("/archive/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const updatedNote = await NoteService.archive(id);
        if (!updatedNote) {
            res.status(404).send("item not found");
        }
        res.status(201).json(updatedNote);
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.put("/:id", validate(Schemas.note), async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const itemUpdate: IBaseNote = req.body;
        const updatedNote = await NoteService.update(id, itemUpdate);
        if (!updatedNote) {
            res.status(404).send("item not found");
        }
        return res.status(200).json(updatedNote);
    } catch (e) {
        res.status(500).send(e);
    }
});
notesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        const notes = await NoteService.remove(id);
        res.status(204).send(notes);
    } catch (e) {
        res.status(500).send(e);
    }
});