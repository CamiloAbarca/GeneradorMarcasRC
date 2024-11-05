function dateTimeGenerate(year, month, startHour, endHour, startHourExit, endHourExit) {
  const result = [];

  const date = new Date(year, month - 1, 1);

  const lastDay = new Date(year, month, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
      date.setDate(day);

      const dayOfWeek = date.getDay();

      // Omitir Sábado (6) y Domingo (0)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          const randomHourEntry = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
          const randomMinuteEntry = Math.floor(Math.random() * 60);
          const randomSecondEntry = Math.floor(Math.random() * 60);

          const entryDateTime = new Date(date);
          entryDateTime.setHours(randomHourEntry, randomMinuteEntry, randomSecondEntry);
          
          const randomHourExit = Math.floor(Math.random() * (endHourExit - startHourExit + 1)) + startHourExit;
          const randomMinuteExit = Math.floor(Math.random() * 60);
          const randomSecondExit = Math.floor(Math.random() * 60);

          const exitDateTime = new Date(date);
          exitDateTime.setHours(randomHourExit, randomMinuteExit, randomSecondExit);

          const formattedEntryDateTime = entryDateTime.toISOString().split('T')[0] + ' ' +
              entryDateTime.toTimeString().split(' ')[0];
          const formattedExitDateTime = exitDateTime.toISOString().split('T')[0] + ' ' +
              exitDateTime.toTimeString().split(' ')[0];

          result.push({ entry: formattedEntryDateTime, exit: formattedExitDateTime });
      }
  }

  return result;
}


document.getElementById('downloadBtn').addEventListener('click', function () {
  const employe = document.getElementById('employe').value;
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const startHour = document.getElementById('startThreshold').value;
  const endHour = document.getElementById('endThreshold').value;
  const startHourExit = document.getElementById('startThresholdExit').value;
  const endHourExit = document.getElementById('endThresholdExit').value;

  const dateTimes = dateTimeGenerate(year, month, startHour, endHour, startHourExit, endHourExit);

  let data = '';
  dateTimes.forEach(({ entry, exit }) => {
      data += `\t${employe}\t${entry}\t1\t0\t0\t0\n`; // Entrada
      data += `\t${employe}\t${exit}\t1\t0\t1\t0\n`; // Salida
  });

  const blob = new Blob([data], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = '1_attlog.dat';

    document.body.appendChild(a);
    a.click();

    // Limpiar el DOM
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});