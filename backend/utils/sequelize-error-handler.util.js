const handleSequelizeError = (e) => {
    console.error("Sequelize error:", e.name, e.message);
    if (e.name === 'SequelizeUniqueConstraintError') {
        const uniqueConstraintErrors = e.errors.map(error => ({
        field: error.path,
        value: error.value,
        message: `The value '${error.value}' for '${error.path}' must be unique.`
        }));
        console.error("Unique constraint errors:", uniqueConstraintErrors);
        return { error: "Unique constraint violation", details: uniqueConstraintErrors };
    }
    return { error: e.message };
}

module.exports = handleSequelizeError;