import { Server } from "./Server";
import { Horario } from "./types";

export class Schedule {
    server: Server;
    schedule: Array<Horario> | null = null;

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

    formatSchedule(schedule: string){
        if(typeof schedule === 'string'){
            return JSON.parse(schedule);
        }
        return 'Invalid input'
    }

    showSchedule() {
        return this.schedule;
    }

    showFilteredSchedule(filter: any){
        const filteredSchedule: any = [];
        if(filter.building){
            this.schedule?.forEach((item) => {
                if(item.predio.includes(filter.building)){
                    filteredSchedule.push(item);
                }
            })
            return filteredSchedule;
        }
        return filteredSchedule;
    }
}