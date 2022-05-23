const path = require('path');
const fs = require('fs/promises');
const { stdout } = require('process');
const { stat } = require('fs');

const dir = path.join(__dirname, 'secret-folder');

(async () => {
    const files = await fs.readdir(dir, { withFileTypes: true });

    files.forEach(file => {
        if(!file.isFile()) return;
        
        const filename = file.name.split('.')[0];
        const filepath = path.join(dir, file.name);
        const extention = path.extname(file.name).substring(1);

        stat(filepath, (err, filestat) => {
            const filesize = filestat.size;
            stdout.write(`${filename} - ${extention} - ${filesize}b\n`);
        });
    });
})();




