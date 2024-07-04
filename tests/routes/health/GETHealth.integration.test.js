import request from 'supertest'
import { server, app } from '../../../src/index'

/**
 * El objetivo de este test de integración es probar
 * el endpoint para evaluar si la aplicación responde
 */
describe('GET /health', () => {
    afterAll(() => {
        server.close()
    })

    test('should respond ok message', async () => {
        const response = await request(app.callback()).get('/health')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ message: 'ok' })
    })
});


describe('GET/api/history/:ocurrence',() =>{
        
       /* Test 3
        Dado: Una consulta al servicio
        Cuando: realice una solicitud a /api/history/:ocurrence, tomando en cuenta que :ocurrence es un string de largo = 2, con caracteres alfanuméricos o solo númericos, independiente del case de :country
        Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

        {
            "message": "Solo se aceptan caracteres no numéricos"
        } 
       */
        it('Devolvería status 400 y un mensaje cuando la entrada tiene caracteres no alfabéticos', async () => {
            const event = 'a7c4';
            
            const response = await request(app.callback()).get(`/api/history/${event}`)
            
            expect(response.status).toBe(400);
        
            expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
        });

        /* Test 4
        Dado: Una consulta al servicio
        Cuando: realice una solicitud a /api/history/:ocurrence y el largo sea != 2
        Entonces: debe devolver un status 400 y en el body, un objeto con el siguiente formato:

        {
             "message": "El input debe ser ac o dc"
        }
       */
      it('Devolvería status 400 si no se cumple con el formato de entrada', async () =>{
          const eventolargo='acdtft'
          const response = await request(app.callback()).get(`/api/history/${eventolargo}`)
          
        expect(response.status).toBe(400);
    
         
        expect(response.body).toEqual({ error: 'El input debe ser ac o dc' });
      });

      it('Devolvería status 200 para entradas válidas', async () => {
        const event = 'ac';
        const response = await request(app.callback()).get(`/api/history/${event}`);

        expect(response.status).toBe(200);
        
    });

    it('Debería devolver status 200 y los eventos históricos ordenados para una entrada válida', async () => {
        const event = 'ac';
        const response = await request(app.callback()).get(`/api/history/${event}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { date: "-287",
            description: "Aprobada la ''Lex Hortensia'', en teor\u00eda las distinciones pol\u00edticas en Roma entre los patricios y los plebeyos desaparecen. Sin embargo, en la pr\u00e1ctica, la coalici\u00f3n de familias plebeyas l\u00edderes mantiene el control lo que significa que los patricios son capaces en gran medida de anular el poder de las asambleas. De manera que el gobierno romano sigue siendo de car\u00e1cter olig\u00e1rquico.",
            lang: "es",
            granularity: "year"},
            {
                date: "-286",
                description: "Al tiempo que Demetrio Poliorcetes y su ej\u00e9rcito son perseguidos por Asia Menor hasta los montes Tauro por los ej\u00e9rcitos de Lis\u00edmaco y Seleuco, en Grecia su hijo Ant\u00edgono logra \u00e9xitos. La flota de Ptolomeo es expulsada y los atenienses se rinden a Ant\u00edgono.",
                lang: "es",
                granularity: "year"
            },
            {
                date: "-286",
                description: "Despu\u00e9s de permitir que Pirro de Epiro permaneciera en posesi\u00f3n de Macedonia con el t\u00edtulo de rey, es expulsado por Lis\u00edmaco que se declara a s\u00ed mismo rey, en lugar de Pirro.",
                lang: "es",
                granularity
                
                : "year"
            },
            
        ]);
    });

});