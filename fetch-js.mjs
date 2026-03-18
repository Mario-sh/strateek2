import https from 'https';
https.get('https://strateek-digitalagency.onrender.com/assets/index-CATD3Vcb.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/.{0,100}ceo\.jpeg.{0,100}/g);
    console.log(match);
  });
});