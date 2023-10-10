import { Server } from "./Server";

export class Schedule {
    server: Server;

    constructor(server: Server){
        this.server = server;
    }
    async getSchedule() {
        try {
            return this.server.getSchedule();
        } catch (e) {
            return 'Error';
        }
    }
}