import { MockServer, MockServerOffline } from "./MockServer";
import { Schedule } from "./Schedule";

describe('Testing get server data', () => {
    test('should accept a valid string returned from server', async () => {
        const schedule = new Schedule(new MockServer);
        const serverData: string = await schedule.getSchedule();
        const parsedServerData = JSON.parse(serverData);
        expect(parsedServerData).toHaveProperty('nomeDoProfessor');
        expect(parsedServerData).toHaveProperty('horarioDeAtendimento');
        expect(parsedServerData).toHaveProperty('periodo');
        expect(parsedServerData).toHaveProperty('sala');
        expect(parsedServerData).toHaveProperty('predio');
    });

    test('should throw error if server does not respond', async () => {
        const schedule = new Schedule(new MockServerOffline);
        const serverData: string = await schedule.getSchedule();
        expect(serverData).toEqual('Error');
    });
})