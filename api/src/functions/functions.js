const { app } = require('@azure/functions');

app.http('functions', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

       

        return { body: `Hello,frm azure` };
    }
});
