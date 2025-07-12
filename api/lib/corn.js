import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    https
       .get(process.env.ASJKTOOKT, (res) => {
        if(res.statusCode === 200) console.log("Get req sent successfully");
        else console.log("req failed", res.statusCode);
       })
       .on("error", (e) => console.error("Error while sending request", e));
});

export default job;