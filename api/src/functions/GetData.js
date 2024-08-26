const { app } = require('@azure/functions');

app.http('GetData', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

       

        const pool = new Pool({
            user: 'dbuser',
            host: 'nestit-337',
            database: 'test',
            password: 'dbuser',
            port: 5432,
        });
    
        let client;
    
        try {
          client = await pool.connect();
          const query = 'SELECT * FROM sst_work_order';
          const result = await client.query(query);
    
          const rows = result.rows; // Array of rows
          context.log('Query result:', rows);
    
          return {
            status: 200,
            body: JSON.stringify(rows),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*" // Allow CORS if needed
            }
          };
        } catch (err) {
          context.log('Error executing query:', err);
          return {
            status: 500,
            body: JSON.stringify({ error: 'An error occurred while processing your request.' }),
            headers: {
              "Content-Type": "text/plain",
              "Access-Control-Allow-Origin": "*"
            }
          };
        } finally {
          if (client) {
            client.release();
          }
        }
      }
    
});
