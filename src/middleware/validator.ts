import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema, object, string } from 'yup';
import { Category } from "../models/category";


export const validate = (schema: AnyObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await schema.validate(req.body);
            res.locals.data = data;
            next();
        } catch (error) {
            console.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    note: object().shape({
        title: string().required(),
        description: string().optional().nullable(true),
        category: string().required().oneOf(Object.values(Category))
    })
};