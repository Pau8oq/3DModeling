import fs from 'fs';
export class CustomObjLoader {
    readJson(path) {
        let text = fs.readFileSync(path);
    }
}
