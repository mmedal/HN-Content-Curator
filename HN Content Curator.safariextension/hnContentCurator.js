function curateHN(bannedDomains) {
  const rows = [ ...document.querySelectorAll('#hnmain .itemlist tr') ];

  rows.forEach((row, i) => {
      if (row.className !== 'athing') return;
      const site = row.querySelector('.sitestr');
      const rank = row.querySelector('.rank').innerText.replace(/\.+$/, "");
      if (site && bannedDomains.find(s => s.includes(site.innerText))) {
          console.log(`HN Content Curator removing #${rank} from ${site.innerText}`);
          // Remove blacklisted row and padding
          row.remove();
          rows[i + 1].remove();
          rows[i + 2].remove();
      }
  });
}


function issueBannedRequest() {
  safari.self.tab.dispatchMessage('requestBanned');
}


function receiveResponse(messageEvent) {
  if (messageEvent.name === 'responseBanned') {
    bannedSetting = messageEvent.message;
    curateHN(bannedSetting.split(',').map(s => s.trim()));
  }
}


safari.self.addEventListener('message', receiveResponse, false);
issueBannedRequest();
