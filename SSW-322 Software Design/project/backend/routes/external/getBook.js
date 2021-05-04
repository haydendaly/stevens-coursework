/*#################################################
For: SSW 322
By: Bruno, Hayden, Madeline, Miriam, and Scott
#################################################*/

const https = require('https');
const parseString = require('xml2js').parseString;
const Tokenizer = require('sentence-tokenizer');
const key = require('../../private').GOODREADS_KEY;

var getRequest = async function (url, extension, xml, callback) {
  var type = 'json'
  if (xml) {
    type = 'xml'
  };
  var options = {
    hostname: url,
    port: 443,
    path: extension,
    method: 'GET',
    headers: {
      'Content-Type': 'application/' + type
    }
  };

  const port = options.port == 443 ? https : http;

  let output = '';
  const req = port.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      output += chunk;
    });
    res.on('end', () => {
      if(xml) {
        parseString(output, (err, data) => {
          book = data.GoodreadsResponse;
          callback(book);
        })
      } else {
        callback(output);
      }
    });
  });
  req.on('error', error => {
    res.send('error: ' + error.message);
  });
  req.end();
}

var cleanText = function (rawText) {
  // Could be done so much betetr but why question it if it works lol
  var noB = rawText.split('<b>').join('');
  var noOtherB = noB.split('</b>').join('');
  var cleanText = noOtherB.split('<br />').join(' ');
  var cleanerText = cleanText.split('<i>').join(' ');
  var cleanestText = cleanerText.split('</i>').join(' ');
  var cleanerText1 = cleanestText.split('<div>').join(' ');
  var cleanestText1 = cleanerText1.split('</div>').join(' ');
  var cleanerText2 = cleanestText1.split('<p>').join(' ');
  var cleanestText2 = cleanerText2.split('</p>').join(' ');
  var cleanerText3 = cleanestText2.split('<blockquote>').join(' ');
  var cleanestText3 = cleanerText3.split('</blockquote>').join(' ');
  var tokenizer = new Tokenizer('Description');
  tokenizer.setEntry(cleanestText2);
  var description = tokenizer.getSentences()[0] + ' ' + tokenizer.getSentences()[1];
  return [cleanestText2, description];
}

module.exports = async function (bookID, callback) {
  getRequest('www.goodreads.com', '/book/show/' + bookID + '?key=' + key, true, function(book){
    book = book.book[0];
    var text = cleanText(book.description[0]);
    var image = book.image_url[0].split('._SY160_').join('');
    var imageClean = image.split('._SX98_').join('');
    if (imageClean.includes('nophoto')) {
      imageClean = 'https://i.pinimg.com/474x/49/60/7c/49607c19eaf6e456ac6f06ad4688f337.jpg'
    }
    bookData = {
      'bookID' : book.id[0],
      'title' : book.title[0],
      'isbn' : book.isbn[0],
      'isbn13' : book.isbn13[0],
      'description' : text[0],
      'shortDescription' : text[1],
      'author' : book.authors[0].author[0].name[0],
      'pages' : book.num_pages[0],
      'imgURL' : imageClean,
      'rating' : book.average_rating[0],
      'numberOfRatings' : Number(book.ratings_count[0]),
      'purchaseURL' : 'https://www.amazon.com/s?k=' +book.isbn[0] + '&ref=haydendaly-20'
    };
    callback(bookData);
  });
}
