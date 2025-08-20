#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendReport_1 = require("../utils/sendReport");
// Execute the email sending
(0, sendReport_1.sendReportNow)()
    .then(() => {
    console.log('Authentication setup report has been sent to info.pathmatch@gmail.com');
    process.exit(0);
})
    .catch((error) => {
    console.error('Failed to send report:', error);
    process.exit(1);
});
