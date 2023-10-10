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

    showSchedule(paginate: number | null = null) {
        if(!paginate)
        return this.schedule;
        return this.schedule?.slice(0, paginate);
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

        if(filter.nomeDoProfessor){
            this.schedule?.forEach((item) => {
                if(item.nomeDoProfessor.includes(filter.nomeDoProfessor)){
                    filteredSchedule.push(item);
                }
            });
            return filteredSchedule;
        }

        if(filter.horarioDeAtendimento){
            this.schedule?.forEach((item) => {
                if(item.horarioDeAtendimento.includes(filter.horarioDeAtendimento)){
                    filteredSchedule.push(item);
                }
            });
            return filteredSchedule;
        }

        if(filter.periodo){
            this.schedule?.forEach((item) => {
                if(item.periodo.includes(filter.periodo)){
                    filteredSchedule.push(item);
                }
            });
            return filteredSchedule;
        }
        return filteredSchedule;
    }
}