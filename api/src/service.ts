export const subHour = (time1: string, time2: string): string => {
  // Converte as horas para objetos Date para facilitar a manipulação
  const date1 = new Date(`2023-01-01T${time1}`);
  const date2 = new Date(`2023-01-01T${time2}`);

  // Calcula a diferença em milissegundos
  const diffInMilliseconds = date1.getTime() - date2.getTime();

  // Converte a diferença de volta para o formato de hora
  const diffDate = new Date(diffInMilliseconds);
  const hours = diffDate.getUTCHours();
  const minutes = diffDate.getUTCMinutes();

  // Formata a string de resultado
  const result = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  return result;
}