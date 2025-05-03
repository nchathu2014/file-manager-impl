import { printHelp } from "./../common/help.js";

const getFileManagerVersion = () => console.log(`File Manager version: ${'v1.0.0'}`); //TODO: get version from package.json
const getHelpInfo = () => printHelp()

export const getCommonInfo = (args) => {
    if (args === '--help') {
        getHelpInfo();
    } else if (args === '--version' || args === '-v') {
        getFileManagerVersion();
    } else {
        console.log('Invalid command. Use --help to see the command list.');
    }

}
 