const fs = require('fs');
const asyncfs = require('fs/promises');
const path = require('path');

const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

const dir = path.join(__dirname, 'styles');

(async () => {
    const files = await asyncfs.readdir(dir, { withFileTypes: true });

    files.forEach(file => {
        if(!file.isFile()) return;
        const filepath = path.join(dir, file.name);
        if(!(path.extname(filepath) === '.css')) return;
        fs.readFile(filepath, 'utf8', (err, content) => {
            writeStream.write(content);
        });
    });
})();