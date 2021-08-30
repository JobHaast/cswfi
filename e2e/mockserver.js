//
// This server will be started by Protractor in end-to-end tests.
// Add your API mocks for your specific project in this file.
//
const express = require('express');
const port = 3000;

let app = express();
let routes = require('express').Router();

// Add CORS headers so our external Angular app is allowed to connect
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

routes.post('/api/login', (req, res, next) => {
  res.status(200).json({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFkbWluIjp0cnVlLCJmaWxtcyI6WyI1ZmJlNTQzMmRjYjIwYjA2OGMzZjdiODkiXSwiX2lkIjoiNWZjMjI3ZjFmYzgzZGQwODM4NDZlZTdlIiwiZmlyc3ROYW1lIjoiSm9iIiwibGFzdE5hbWUiOiJIYWFzdCIsImVtYWlsIjoiZW1haWxAZW1haWwuY29tIiwiYmlydGhEYXRlIjoiMjAyMC0wMy0xNVQwMDowMDowMC4wMDBaIiwicGFzc3dvcmQiOiIkMmIkMTAkZjhSLlZSODRxM2tKVXZCdldhQjRyLnhKcEY4UDZ1UmdxNjh6Y1FRbk1GRHlOek1jcEJzRG0iLCJwaG9uZU51bWJlciI6IjA2Nzg3ODc4NzgiLCJjaXR5IjoiQnJlZGEiLCJzdHJlZXROYW1lIjoiTGFuZ2UgQmVkZGUiLCJudW1iZXIiOiIzOSIsIl9fdiI6MH0sImlhdCI6MTYwNzMzODMyNiwiZXhwIjoxNjA3MzQ1NTI2fQ.t0xcH5lh8M68dbF_EnTw3XT_0ZsNnkZf9d2SEbEjl4k',
    user: {
      admin: true,
      films: [],
      _id: '5fc227f1fc83dd083846ee7e',
      firstName: 'Job',
      lastName: 'Haast',
      email: 'email@email.com',
      birthDate: '2020-03-15T00:00:00.000Z',
      password: '$2b$10$f8R.VR84q3kJUvBvWaB4r.xJpF8P6uRgq68zcQQnMFDyNzMcpBsDm',
      phoneNumber: '0678787878',
      city: 'Breda',
      streetName: 'Lange Bedde',
      number: '39',
      __v: 0,
    },
    exp: 18000000,
  });
});

routes.get('/api/halls/1', (req, res, next) => {
  res.status(200).json({
    _id: '1',
    name: 'Zaal 1',
    seats: 60,
    __v: 0,
    description:
      'Hier schrijf ik een mooi bulshit stukje over een zaal en hoe mooi deze is whooooooooooo!',
  });
});

//
// Write your own mocking API endpoints here.
//

// Finally add your routes to the app
app.use(routes);

app.use('*', function (req, res, next) {
  next({ error: 'Non-existing endpoint' });
});

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

app.listen(port, () => {
  console.log('Mock backend server running on port', port);
});
