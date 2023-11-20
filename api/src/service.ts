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

export const checkStates = (plate: string) => {
  const letters = getLettersIdentification(plate);

  const stateInterval = [
      { inicio: 'AAA', fim: 'BEZ', estado: 'Paraná', code: 0 },
      { inicio: 'RHA', fim: 'RHZ', estado: 'Paraná', code: 0 },
      { inicio: 'IAQ', fim: 'JDO', estado: 'Rio Grande do Sul', code: 1 },
      { inicio: 'LWR', fim: 'MMM', estado: 'Santa Catarina', code: 2 },
      { inicio: 'OKD', fim: 'OKH', estado: 'Santa Catarina', code: 2 },
      { inicio: 'QHA', fim: 'QJZ', estado: 'Santa Catarina', code: 2 },
      { inicio: 'QTK', fim: 'QTM', estado: 'Santa Catarina', code: 2 },
      { inicio: 'RAA', fim: 'RAJ', estado: 'Santa Catarina', code: 2 },
      { inicio: 'RDS', fim: 'REB', estado: 'Santa Catarina', code: 2 },
      { inicio: 'RKW', fim: 'RLP', estado: 'Santa Catarina', code: 2 },
      { inicio: 'RXK', fim: 'RYI', estado: 'Santa Catarina', code: 2 }
  ];

  for (const interval of stateInterval) {
      if (letters >= interval.inicio && letters <= interval.fim) {
          return {code: interval.code, state: interval.estado};
      }
  }

  return {code: 3, state: 'Estado não cadastrado'};
}

const getLettersIdentification = (plate: string) => {
  const letters = plate.replace(/[^a-zA-Z]/g, '');

  return letters;
}