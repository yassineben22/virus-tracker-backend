import {Response , Request} from 'express';

var sendNotification = function(data: any) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res:any) {  
      res.on('data', function(data:any) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e:any) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
  };
  
  var message = { 
    app_id: "f77b95c9-b3c5-4174-bdc7-15ef7c959728",
    contents: {"en": "Vous avez rencontré ycr", "body": "body test"},
    include_player_ids: ["5d763deb-d7bb-4634-8fab-8b0a07d540eb"]
  };

export default async function testNotif(req: Request, response: Response) {

  
  sendNotification(message);

    response.status(200).send({
        msg: "Notification envoyée avec succes",
        });
}