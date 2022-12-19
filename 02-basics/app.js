const http = require('http');
const fs = require('fs');

const rqListener = (req, res) => {
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
      fs.writeFileSync('message-text.txt', message);
    });

    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    res.writeHead(302, { Location: '/' });
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('</html>');
  res.end();
};

// http.createServer(function(req,res));
// http.createServer((req,res)=>{});

const server = http.createServer(rqListener);

server.listen(3000);
