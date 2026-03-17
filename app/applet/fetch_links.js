import https from 'https';

https.get('https://strateek.wuaze.com/?i=2', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const regex = /<a[^>]+href="([^"]+)"[^>]*>.*?Shape of Key.*?<\/a>|<a[^>]+href="([^"]+)"[^>]*>.*?ONG FÄ ET.*?<\/a>|<a[^>]+href="([^"]+)"[^>]*>.*?GCBÊ.*?<\/a>|<a[^>]+href="([^"]+)"[^>]*>.*?SculptBelt.*?<\/a>|<a[^>]+href="([^"]+)"[^>]*>.*?Créations Graphiques.*?<\/a>|<a[^>]+href="([^"]+)"[^>]*>.*?Campagne SEO.*?<\/a>/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      console.log(match[0]);
    }
    
    // Alternative simple search if regex fails
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Shape of Key') || lines[i].includes('ONG FÄ ET') || lines[i].includes('GCBÊ') || lines[i].includes('SculptBelt') || lines[i].includes('Créations Graphiques') || lines[i].includes('Campagne SEO')) {
        console.log('--- MATCH ---');
        console.log(lines[i-2]);
        console.log(lines[i-1]);
        console.log(lines[i]);
        console.log(lines[i+1]);
        console.log(lines[i+2]);
      }
    }
  });
}).on('error', (e) => {
  console.error(e);
});
