function doPost(e) {
    var ss = SpreadsheetApp.openById("1rMYGyKQk1K_7k5sqYnOcWFhDo8QXJoCjRgX81zwroNQ");
    var sheet = ss.getSheetByName("Sheets");
    var requestJSON = e.postData.contents;
    var requestObj = JSON.parse(requestJSON).events[0];
    var token = requestObj.replyToken;
    
    if (requestObj.type === "follow") {
      var userId = requestObj.source.userId;
      var userProfiles = getUserProfiles(userId);
      
      var lastRow = sheet.getLastRow();
      sheet.getRange(lastRow + 1, 1).setValue(userId);
      sheet.getRange(lastRow + 1, 2).setValue(userProfiles[0]);
      sheet.getRange(lastRow + 1, 3).setValue(userProfiles[1]);
      sheet.getRange(lastRow + 1, 4).setFormula("=image(C" + (lastRow + 1) + ")");
      
      var replyText = "Hello"+ userProfiles[0] + ", Welcome to My Bot !!";
      return replyMessage(token, replyText);
    }
    var userMessage = requestObj.message.text.toLowerCase();
    var replyText = userMessage;
    return replyMessage(token, replyText);
  }
  
  function replyMessage(token, replyText) {
    var url = "https://api.line.me/v2/bot/message/reply";
    var lineHeader = {
      "Content-Type": "application/json",
      "Authorization": "Bearer X60pZY7wrDmox5r3KAmID7Cfc6pIXAjIiFYq6WbAS/8jHngD92fzTUqE4LqUot46NhC72PFCLQv8rcWYz4fO4eBICY/XgHriUsi9kT9e9gvr9ezXr6trVwPGNvLeOJprq/QDQK4FQjHdqOk5c8MS4QdB04t89/1O/w1cDnyilFU="
    };
  
    var postData;
    if (replyText === 'buy') {
      postData = {
        "replyToken" : token,
        "messages" : [{
          "type": "flex",
          "altText": "Buy Flex Message",
          "contents": {
    "type": "bubble",
    "hero": {
      "type": "image",
      "url": "https://i.imgur.com/Q76pEnB.png",
      "size": "full",
      "aspectRatio": "20:13",
      "aspectMode": "cover",
      "action": {
        "type": "uri",
        "label": "Line",
        "uri": "https://linecorp.com/"
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "HoneyConn",
          "weight": "bold",
          "size": "xl",
          "contents": []
        },
        {
          "type": "box",
          "layout": "baseline",
          "margin": "md",
          "contents": [
            {
              "type": "icon",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              "size": "sm"
            },
            {
              "type": "icon",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              "size": "sm"
            },
            {
              "type": "icon",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              "size": "sm"
            },
            {
              "type": "icon",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              "size": "sm"
            },
            {
              "type": "icon",
              "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
              "size": "sm"
            },
            {
              "type": "text",
              "text": "5.0",
              "size": "sm",
              "color": "#999999",
              "flex": 0,
              "margin": "md",
              "contents": []
            }
          ]
        }
      ]
    },
    "footer": {
      "type": "box",
      "layout": "vertical",
      "flex": 0,
      "spacing": "sm",
      "contents": [
        {
          "type": "button",
          "action": {
            "type": "message",
            "label": "Purchase",
            "text": "HoneyConn"
          },
          "color": "#FFD064FF",
          "height": "sm",
          "style": "primary",
          "gravity": "top"
        },
        {
          "type": "button",
          "action": {
            "type": "uri",
            "label": "Website",
            "uri": "https://www.netizen.co.th/th/"
          },
          "color": "#FFD144FF",
          "height": "sm",
          "style": "primary"
        },
        {
          "type": "spacer",
          "size": "sm"
        }
      ]
    }
  }
        }]
      };
    } else {
      postData = {
        "replyToken" : token,
        "messages" : [{
          "type" : "text",
          "text" : replyText
        }]
      };
    }
  
    var options = {
      "method" : "POST",
      "headers" : lineHeader,
      "payload" : JSON.stringify(postData)
    };
  
    try {
      var response = UrlFetchApp.fetch(url, options);
    }
    
    catch (error) {
      Logger.log(error.name + "：" + error.message);
      return;
    }
      
    if (response.getResponseCode() === 200) {
      Logger.log("Sending message completed.");
    }
  }
  function getUserProfiles(userId) {
    var url = "https://api.line.me/v2/bot/profile/" + userId;
    var lineHeader = {
      "Content-Type": "application/json",
     "Authorization": "Bearer X60pZY7wrDmox5r3KAmID7Cfc6pIXAjIiFYq6WbAS/8jHngD92fzTUqE4LqUot46NhC72PFCLQv8rcWYz4fO4eBICY/XgHriUsi9kT9e9gvr9ezXr6trVwPGNvLeOJprq/QDQK4FQjHdqOk5c8MS4QdB04t89/1O/w1cDnyilFU=" 
    };
    
    var options = {
      "method" : "GET",
      "headers" : lineHeader
    };
    
    var responseJson = UrlFetchApp.fetch(url, options);
    var displayName = JSON.parse(responseJson).displayName;
    var pictureUrl = JSON.parse(responseJson).pictureUrl;
    
    return [displayName, pictureUrl];
  }