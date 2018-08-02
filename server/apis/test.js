WebApp.connectHandlers.use("/api/test", function(req, res, next) {
    //res.writeHead(200);
    //sendJson(req,res,{hello: 'world'});
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 1 }, null, 3));
})