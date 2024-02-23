import { Viewer } from './dist/bundle.js';

const viewer = new Viewer();
viewer.init();

await viewer.loadObjAsync('./assets/models/hatchet/source/Axe/Axe.obj');

await viewer.loadFileAsync('./assets/models/washbasin_Sani.3DJison');