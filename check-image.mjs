import https from 'https';
https.get('https://strateek-digitalagency.onrender.com/images/ceo.jpeg', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
});