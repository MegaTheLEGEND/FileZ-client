window.localStorage.setItem("siteVersion", "2.2.6"); // set site version
var siteVersion = window.localStorage.getItem("siteVersion");

//toast

  if (newestVersion === siteVersion) {
	showToast('Site up to date. ' + siteVersion, 'about.html', 'green', 3000);
  } else {
	showToast('Please update your site version. Current version: ' + siteVersion + ' --> ' + newestVersion, 'about.html', 'red', 8000);
  }
