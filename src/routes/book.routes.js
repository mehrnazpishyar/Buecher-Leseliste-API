import { Router } from 'express';
import auth from '../middleware/auth.js';
import validate from '../middleware/validate.js';
import { createBookSchema, updateBookSchema } from '../schemas/book.schema.js';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/book.controller.js';

const router = Router();

router.use(auth);

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', validate(createBookSchema), createBook);
router.put('/:id', validate(updateBookSchema), updateBook);
router.delete('/:id', deleteBook);

export default router;