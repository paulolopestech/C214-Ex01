import { Server } from "./Server";

export class MockServer implements Server {
    getSchedule(): string {
        return '{"nomeDoProfessor":"Chris","horarioDeAtendimento":"Segunda-Feira 10:30","periodo":"Integral","sala":"1","predio":["1"]}';
    }
}

export class MockServerOffline implements Server {
    getSchedule(): string {
        throw new Error("500");
    }
}