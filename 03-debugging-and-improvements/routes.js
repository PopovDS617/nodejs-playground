const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>hello</title></head>');
    res.write(
      `<body>
      <form action="/message" method="POST">
      <input type="text" name="message"/>
      <button type="submit">send the data</button>
      </form>
      </body>`
    );
    res.write('</html>');

    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(parsedBody);
      fs.writeFile('message-text.txt', message, (err) => {
        res.writeHead(302, { Location: '/' });
        return res.end();
      });
    });

    // res.statusCode = 302;
    // res.setHeader('Location', '/');
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('</html>');
  res.end();
};

// module.exports.handler=requestHandler
// module.exports.defaultText='test'

module.exports = { handler: requestHandler, defaultText: 'test' };
