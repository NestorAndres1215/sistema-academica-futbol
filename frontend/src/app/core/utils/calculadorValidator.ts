export function calcularNotaFinal(evaluacion: any): number {
  return (
    (evaluacion.pases ?? 0) +
    (evaluacion.tiros ?? 0) +
    (evaluacion.posicionamiento ?? 0) +
    (evaluacion.visionJuego ?? 0) +
    (evaluacion.resistencia ?? 0) +
    (evaluacion.velocidad ?? 0) +
    (evaluacion.fuerza ?? 0) +
    (evaluacion.concentracion ?? 0) +
    (evaluacion.tomaDecisiones ?? 0)
  );
}


export function calcularTotalNotaFinal(estudiantes: any[]): number {
  return estudiantes?.reduce(
    (sum, estudiante) => sum + (estudiante.notaFinal ?? 0),
    0
  ) || 0;
}
