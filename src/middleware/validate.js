function validate(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const issue = result.error.issues[0];
            const field = issue.path.join('.');
            const prefix = field ? `Ungültige Eingabe (${field})` : "Ungültige Eingabe";
            return res.status(400).json({error:`${prefix}: ${issue.message}` })
        }

        req.body = result.data;
        next();
    }
}

export default validate;