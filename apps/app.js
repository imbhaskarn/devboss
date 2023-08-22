const fs = require('fs');
const path = require('path');

const projectStructure = {
    'src': {
        'config': ['database.ts', 'index.ts'],
        'models': ['index.ts', 'user.ts'],
        'migrations': {},
        'seeders': {},
        'controllers': {},
        'routes': ['index.ts', 'userRoutes.ts'],
        'middlewares': {},
        'utils': {},
        'interfaces': {},
        'app.ts': null
    },
    'tests': {
        'unit': {},
        'integration': {},
        'setup.ts': null
    },
    '.sequelizerc': null,
    'tsconfig.json': null,
    'jest.config.js': null,
    'package.json': null,
    'README.md': null
};

function createStructure(base, structure) {
    for (const item in structure) {
        if (typeof structure[item] === 'object') {
            if (Array.isArray(structure[item])) {
                structure[item].forEach(file => {
                    fs.writeFileSync(path.join(base, file), '', 'utf8');
                });
            } else {
                fs.mkdirSync(path.join(base, item), { recursive: true });
                createStructure(path.join(base, item), structure[item]);
            }
        } else {
            fs.writeFileSync(path.join(base, item), '', 'utf8');
        }
    }
}

createStructure('api', projectStructure);

console.log("Project structure has been created!");
