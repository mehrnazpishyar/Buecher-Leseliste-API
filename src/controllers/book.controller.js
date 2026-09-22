import prisma from '../prisma/client.js';

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function getBooks(req, res) {
  const where = { userId: req.userId };

  const { read } = req.query;
  if (read !== undefined) {
    if (read !== 'true' && read !== 'false') {
      return res.status(400).json({ error: "Filter 'read' muss true oder false sein" });
    }
    where.read = read === 'true';
  }

  const books = await prisma.book.findMany({ where, orderBy: { id: 'asc' } });
  return res.json(books);
}

export async function getBookById(req, res) {
  const id = parseId(req.params.id);

  const book = id
    ? await prisma.book.findFirst({ where: { id, userId: req.userId } })
    : null;

  if (!book) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  return res.json(book);
}

export async function createBook(req, res) {
  const { title, author, read } = req.body;

  const book = await prisma.book.create({
    data: { title, author, read: read ?? false, userId: req.userId },
  });

  return res.status(201).json(book);
}

export async function updateBook(req, res) {
  const id = parseId(req.params.id);

  const existing = id
    ? await prisma.book.findFirst({ where: { id, userId: req.userId } })
    : null;

  if (!existing) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  const book = await prisma.book.update({ where: { id }, data: req.body });
  return res.json(book);
}

export async function deleteBook(req, res) {
  const id = parseId(req.params.id);

  const existing = id
    ? await prisma.book.findFirst({ where: { id, userId: req.userId } })
    : null;

  if (!existing) {
    return res.status(404).json({ error: 'Buch nicht gefunden' });
  }

  await prisma.book.delete({ where: { id } });
  return res.json({ message: 'Book deleted successfully' });
}