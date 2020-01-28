import { ipcMain } from 'electron';



export class Api {

    constructor() {
        ipcMain.on('ping', (event, arg) => {
            event.returnValue = 'pong';
        });
    }
};
