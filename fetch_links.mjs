import https from 'https';

https.get('https://strateek.wuaze.com/?i=2', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log("Total length:", data.length);
    console.log("Contains Shape of Key?", data.includes('Shape of Key'));
    console.log("Contains ONG FÄ ET?", data.includes('ONG FÄ ET'));
    
    // Print a chunk of HTML to see what we're getting
    console.log(data.substring(0, 500));
  });
}).on('error', (e) => {
  console.error(e);
});
