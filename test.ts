import { MockServer, MockServerOffline } from "./MockServer";
import { Schedule } from "./Schedule";

const mockSchedule = [JSON.parse('{"nomeDoProfessor":"Chris","horarioDeAtendimento":"Segunda-Feira 10:30","periodo":"Integral","sala":"1","predio":["1"]}')];

describe('Testing getSchedule', () => {
    test('should accept a string returned from server', async () => {
        const schedule = new Schedule(new MockServer);
        const serverData: string = await schedule.getSchedule();
        const response = JSON.parse(serverData);
        expect(typeof response).toBe('object')
    });

    test('should throw error if server does not respond', async () => {
        const schedule = new Schedule(new MockServerOffline);
        const response: string = await schedule.getSchedule();
        expect(response).toEqual('Error');
    });
});

describe('Testing formatSchedule', () => {
    test('should return a parsed json', async () => {
        const input = '{"nomeDoProfessor":"Chris","horarioDeAtendimento":"Segunda-Feira 10:30","periodo":"Integral","sala":"1","predio":["1"]}';

        const schedule = new Schedule(new MockServer);
        const response: string = await schedule.formatSchedule(input);
        expect(response).toHaveProperty('nomeDoProfessor');
        expect(response).toHaveProperty('horarioDeAtendimento');
        expect(response).toHaveProperty('periodo');
        expect(response).toHaveProperty('sala');
        expect(response).toHaveProperty('predio');
    });

    test('should return invalid input if input is not a string', async () => {
        const input: any = 10;
        const schedule = new Schedule(new MockServer);
        const response: string = await schedule.formatSchedule(input);
        expect(response).toEqual('Invalid input');
    });
});

describe('Testing showSchedule', () => {
    test('should return a schedule list', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const response = schedule.showSchedule();
        expect(response?.length).toBe(1);
    });


    test('should return null if not get schedule', async () => {
        const schedule = new Schedule(new MockServer);
        const response = schedule.showSchedule();
        expect(response).toBe(null);
    });
});

describe('Testing showFilteredSchedule', () => {
    test('should return empty array if not get schedule', async () => {
        const schedule = new Schedule(new MockServer);
        const filter = {building: '6'}
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });

    test('should return empty array if not match filter', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {building: '6'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });

    test('should return list of teachers who work in building 1', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {building: '1'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual(mockSchedule);
    });
});