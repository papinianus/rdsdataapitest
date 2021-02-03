import { RDSDataService } from "aws-sdk";
import {config} from "aws-sdk";
import { ExecuteStatementRequest } from "aws-sdk/clients/rdsdataservice";

function sleep(time:number) {
    return new Promise<void>(resolve => {
        setTimeout(() => {resolve()}, time);
    });
}

(async function () {
    console.log(config.maxRetries);
    console.log((new Date()).toISOString());
    for(let i = 0; i < 1; i++) {
        const rds = new RDSDataService({
            region: "ap-northeast-1",
            accessKeyId: "",
            secretAccessKey: ""
        });
        const resource = {
            resourceArn: "",
            secretArn: "",
        }
        const database = {...resource,database:""}
        const params: ExecuteStatementRequest = {...database,
            sql: "select * from test",
            includeResultMetadata: true
        };
        let id = "";
        rds.beginTransaction(database,(err,res)=> {
            if(err !== null) console.log(err);
            if(res === null) throw Error("cannot begin transaction");
            console.log(`begin transaction ${(new Date()).toISOString()}`);
            id = res.transactionId || "";
            rds.executeStatement(params, (err, data) => {
                if (err) {
                    console.error(err, err.stack);
                } else {
                    console.log(`${i} Fetch ${data.records!.length} rows! ${Date.now()}`);
                    // console.log(data.columnMetadata!.map(col => col.name).join(","));
                    // for (const record of data.records!) {
                    //     console.log(record.map(col => Object.values(col)[0]).join(","));
                    // }
                }
            });
            rds.commitTransaction({...resource,transactionId:id},(err,res)=>{
                if(err !== null) console.log(id,err);
                console.log(`commit ${res.transactionStatus} ${(new Date()).toISOString()}`);
            });
        });
    }
})();

// Class: AWS.RDSDataService — AWS SDK for JavaScript
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/RDSDataService.html#beginTransaction-property
