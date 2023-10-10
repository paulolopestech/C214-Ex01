import { MockServer, MockServerOffline } from "./MockServer";
import { Schedule } from "./Schedule";

const mockSchedule = [
    JSON.parse('{"nomeDoProfessor":"Chris","horarioDeAtendimento":"Segunda-Feira 10:30","periodo":"Integral","sala":"1","predio":["1"]}'),
    JSON.parse('{"nomeDoProfessor":"Renzo","horarioDeAtendimento":"Terça-Feira 10:30","periodo":"Noturno","sala":"9","predio":["2"]}'),
    JSON.parse('{"nomeDoProfessor":"Marcelo","horarioDeAtendimento":"Quarta-Feira 11:30","periodo":"Integral","sala":"3","predio":["1"]}'),
];

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
        expect(response?.length).toBe(3);
    });


    test('should return null if not get schedule', async () => {
        const schedule = new Schedule(new MockServer);
        const response = schedule.showSchedule();
        expect(response).toBe(null);
    });

    test('should return a paginated list', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const response = schedule.showSchedule(1);
        expect(response?.length).toBe(1);
    });

    test('should return the entire list when paginate is 0', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const response = schedule.showSchedule(0);
        expect(response?.length).toBe(3);
    });

    test('should return the entire list when paginate is overflow', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const response = schedule.showSchedule(10);
        expect(response?.length).toBe(3);
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
        expect(response).toEqual([mockSchedule[0], mockSchedule[2]]);
    });

    test('should return list of shchedules of professor Chris', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {nomeDoProfessor: 'Chris'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([mockSchedule[0]]);
    });

    test('should return empty array if teacher has not a schedule', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {nomeDoProfessor: 'Guilherme'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });

    test('should return schedules per day', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {horarioDeAtendimento: 'Segunda'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([mockSchedule[0]]);
    });

    test('should return schedules per time', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {horarioDeAtendimento: '10:30'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([mockSchedule[0], mockSchedule[1]]);
    });

    test('should return empty array when filter domingo', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {horarioDeAtendimento: 'Domingo'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });

    test('should return empty array when filter midnight', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {horarioDeAtendimento: '00:00'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });


    test('should filter by periodo', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {periodo: 'Integral'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([mockSchedule[0], mockSchedule[2]]);
    });

    test('should return empty array when periodo not exists', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {periodo: 'p10'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });

    test('should return empty array when filter not exists', async () => {
        const schedule = new Schedule(new MockServer);
        schedule.schedule = mockSchedule;
        const filter = {colegio: 'Inatel'};
        const response = schedule.showFilteredSchedule(filter);
        expect(response).toEqual([]);
    });
});