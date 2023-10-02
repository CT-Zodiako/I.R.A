export interface Nota {
    id: number;
    materia_id: number;
    parcial_1: number;
    parcial_2: number;
    final: number;
  }
  export interface NotaAll {
    id: number;
    materia_id: number;
    materia: string;
    semestre: number;
    parcial_1: number;
    parcial_2: number;
    final: number;
    promedio: number;
  }
  