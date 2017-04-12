const request = require('request');

module.exports = function(name, type = 'user') {
  return new Promise((resolve, reject) => {
    if (!name) throw new Error('Invalid url');
    let url;
    switch (type) {
      case 'user':
      case 'page':
        url = `https://www.facebook.com/${name}`;
        break;
      case 'group':
        url = `https://www.facebook.com/groups/${name}`;
        break;
      default:
        throw new Error('invalid type');
    }
    request({
      method: 'GET',
      uri: url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode === 200) {
		    const arrMatches = body.match(/entity_id":"\d*/i);
        if (arrMatches && arrMatches.length > 0) {
          const id = arrMatches[0].split('"').pop();
          resolve(id);
        }
        reject(`Id not found for ${name}`);
      } else {
        reject(res);
      }
    });
  });
}
