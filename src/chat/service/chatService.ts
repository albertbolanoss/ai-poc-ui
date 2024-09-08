import { Observable } from 'rxjs';

export const generateStream = (message: string): Observable<string> => {
  return new Observable((subscriber) => {
    fetch(`http://localhost:8080/chat?message=${encodeURIComponent(message)}`, { method: 'GET', credentials: 'include', headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let botMessage = '';

        if (!reader) {
          subscriber.error('No reader available');
          return;
        }

        const read = async () => {
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              // Decodificar el fragmento del stream
              const chunk = decoder.decode(value, { stream: true });
              const parsedChunk = JSON.parse(chunk);
              const botMessage = parsedChunk.map(e => e.result?.output?.content + ' ' || '');

              
              // Emitir el mensaje parcial a través del observable
              subscriber.next(botMessage);
            }
            subscriber.complete(); // Señalar que el stream ha terminado
          } catch (error) {
            subscriber.error(error); // Emitir cualquier error
          }
        };

        read();
      })
      .catch((error) => subscriber.error(error));
  });
};
