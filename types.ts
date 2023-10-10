export type Horario = {
    nomeDoProfessor: String,
    horarioDeAtendimento: String,
    periodo: 'Integral' | 'Noturno',
    sala: String,
    predio: Array<String>,
}