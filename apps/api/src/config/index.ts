export default {
    development: {
        databaseURL:
            process.env.DEV_DATABASE_URL ||
            'postgresql://localhost:5432/myapp_dev',
        // Other development settings
    },
    test: {
        databaseURL:
            process.env.TEST_DATABASE_URL ||
            'postgresql://localhost:5432/myapp_test',
        // Other test settings
    },
    production: {
        databaseURL:
            process.env.DATABASE_URL || 'postgresql://localhost:5432/myapp',
        // Other production settings
    },
};
