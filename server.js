var app = require('./server/app.js')
var port = process.env.PORT || 3000;

app.listen(port);
console.log('listening on port ', port);