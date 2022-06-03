
export default function sendNotifications(list: any[]) {
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
    console.log(list)
    var message = {
        app_id: "f77b95c9-b3c5-4174-bdc7-15ef7c959728",
        contents: {"en": "Vous avez rencontré une personne contaminée!"},
        include_player_ids: list
      };
    
    req.write(JSON.stringify(message));
    req.end();
};