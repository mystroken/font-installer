var traverser = require('./modules/traverser');

var fontsDir = "/Users/ken/Google Drive/resources/premium fonts";
var fontsInstallDir = "/Library/Fonts/";


traverser.traverse(fontsDir, fontsInstallDir);