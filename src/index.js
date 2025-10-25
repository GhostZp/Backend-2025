import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const items = [
  {id: 10, name: 'Item1'},
  {id: 27, name: 'Item2'},
];

const server = http.createServer((req, res) => {
  console.log(`HTTP request: ${req.method} ${req.url}`);

  // GET server root
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to the API! Try GET /items');
  
  // GET all items
  } else if (req.method === 'GET' && req.url === '/items') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(items));

  // GET item by id
  } else if (req.method === 'GET' && req.url.split('/')[1] === 'items') {
    const requestedID = parseInt(req.url.split('/')[2]);
    const found = items.find(i => i.id === requestedID);
    if (found) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(found));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ error: 'Item not found' }));
    }

  // POST new item
  } else if (req.method === 'POST' && req.url === '/items') {
    let body = [];
    req
      .on('data', chunk => body.push(chunk))
      .on('end', () => {
        body = Buffer.concat(body).toString();
        const newItem = JSON.parse(body);
        newItem.id = items[items.length - 1].id + 1;
        items.push(newItem);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newItem));
      });

        
  // PUT item aka update item
  } else if (req.method === 'PUT' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const updatedData = JSON.parse(body);
      const index = items.findIndex(i => i.id === id);
      if (index === -1) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Item not found' }));
      } else {
        items[index] = { ...items[index], ...updatedData };
        res.writeHead(200);
        res.end(JSON.stringify(items[index]));
      }
    });

  // DELETE item
  } else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Item not found' }));
    } else {
      const deletedItem = items.splice(index, 1)[0];
      res.writeHead(200);
      res.end(JSON.stringify({ deleted: deletedItem }));
    }
    
    } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
