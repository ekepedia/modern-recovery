const winston = require('winston');
// require("winston-papertrail").Papertrail;
//
// const winstonPapertrail = new winston.transports.Papertrail({
//     host: 'logs.papertrailapp.com',
//     port: process.env.PAPERTRAIL_PORT,
//     program: 'server',
//     inlineMeta: true,
//     logFormat: function(level, message) {
//         return '[' + level + '] ' + message;
//     }
// });
//
// winstonPapertrail.on('error', function(err) {
//     // Handle, report, or silently ignore connection errors and failures
//     console.log("papertrail error");
// });

winston.remove(winston.transports.Console);

// winston.add(winstonPapertrail, {
// //     timestamp: true,
// //     colorize: true
// // });

winston.add(new winston.transports.Console({
    format: winston.format.simple()
}));

/*winston.info('this is my message');
winston.error('This is a test error message', {type: "auth-failure", mls: 329392});

const meta = {type: "test"};

winston.warn("missing fields", {...meta, errorType: "missing fields"});
*/

