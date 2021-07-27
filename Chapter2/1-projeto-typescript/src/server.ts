// no typescript, é usado o import from ao invés do const require do js
import express from 'express';
import { createCourse } from './routes';

const app = express();

app.get("/", createCourse);

app.listen(3333);