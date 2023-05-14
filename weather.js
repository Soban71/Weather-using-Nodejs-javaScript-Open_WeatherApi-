const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/weather.html');
});

app.post('/weather', function(req, res) {
  const ciName = req.body.cityName; 

  console.log( req.body.cityName);
  const appid ='ce895223564f55a05daaaaf358992bfe';
  const url='https://api.openweathermap.org/data/2.5/weather?appid=ce895223564f55a05daaaaf358992bfe&q='+ciName+';'
  //const url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + appid + '&q=' + ciname + '&units=metric';

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on('data', function(data) {
      const jsn = JSON.parse(data);
      const temp = jsn.main.temp;
      const condition = jsn.weather[0].description;
      const icon = jsn.weather[0].icon;
      const img = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.write('<h1>The temperature in '+ciName+' is ' +temp+' Celsius</h1>');
      res.write('The condition is ' + condition);
      res.write('<img src="' + img + '">');
      res.send(); 
    });
  });
});

app.listen(4000, function() {
  console.log('Running on 4000');
});
