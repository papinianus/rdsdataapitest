import { Lambda } from "aws-sdk";

(async function(){
    const lambda = new Lambda({
        region: "ap-northeast-1",
        accessKeyId: "",
        secretAccessKey: ""
    });
    console.log((new Date()).toISOString());
    Promise.all(Array.from({length:50},(_,i)=>i).map(e=>{
        const params = {
            FunctionName: "",
            Qualifier: "$LATEST"
        };
        lambda.invoke(params, function(err, data) {
            if (err) console.log(e, err, err.stack); // an error occurred
            else     console.log(e, (new Date()).toISOString());//, data);           // successful response
        });
        return e;
    }));
    // for(let i = 0; i < 10; i++) {
    //     const params = {
    //         FunctionName: "rdsdataapi",
    //         Qualifier: "$LATEST"
    //     };
    //     lambda.invoke(params, function(err, data) {
    //         if (err) console.log(err, err.stack); // an error occurred
    //         else     console.log(data);           // successful response
    //     });
    // }
})()

// Class: AWS.Lambda — AWS SDK for JavaScript
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html