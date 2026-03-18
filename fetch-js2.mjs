import https from 'https';
https.get('https://strateek-digitalagency.onrender.com/assets/index-CATD3Vcb.js', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/.{0,300}TOTO HINCHEGNON.{0,300}/g);
    console.log(match);
  });
});