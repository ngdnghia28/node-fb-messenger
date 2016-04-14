var request = require('request')

function FacebookMessenger (token) {
  this.token = token
}

FacebookMessenger.prototype.sendTextMessage = function (id, text, cb) {
  var messageData = {
    text: text
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendImageMessage = function (id, imageURL, cb) {
  var messageData = {
    'attachment': {
      'type': 'image',
      'payload': {
        'url': imageURL
      }
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendHScrollMessage = function (id, elements, cb) {
  var messageData = {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': elements
      }
    }
  }
  this.sendMessage(id, messageData, cb)
}

FacebookMessenger.prototype.sendMessage = function (id, data, cb) {
  var req = {
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: this.token},
    method: 'POST',
    json: {
      recipient: {id: id},
      message: data
    }
  }
  request(req, function (err, res, body) {
    if (err) {
      console.error('Error sending message: ', err)
    } else if (body.error) {
      console.error('Error: ', body.error)
    }
    cb(err, body)
  })
}

module.exports = FacebookMessenger
