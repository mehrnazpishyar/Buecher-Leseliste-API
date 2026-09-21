import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error('Fehler: JWT_SECRET fehlt in der .env-Datei');
    process.exit(1);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
     console.log(`Server läuft auf http://localhost:${PORT}`);
});