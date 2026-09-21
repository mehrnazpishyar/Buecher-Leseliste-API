function errorHandler (err, req, res, next) {
    if (err.type === 'entity.parse.failed') {
        console.error(err);
        return res.status(400).json({ error: 'Ungültiges JSON' });
    }

    console.error(err);
    return res.status(500).json({ error: 'Interner Serverfehler' });
}

export default errorHandler;