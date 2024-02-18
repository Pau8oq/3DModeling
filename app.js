import { Viewer } from './dist/bundle.js';

const viewer = new Viewer();
viewer.init();

viewer.loadObjAsync('./assets/models/hatchet/source/Axe/Axe.obj');