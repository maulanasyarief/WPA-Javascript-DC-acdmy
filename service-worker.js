importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
var base_url = "https://api.football-data.org/v2/";

if (workbox)
	console.log(`Workbox berhasil dimuat`);
else
	console.log(`Workbox gagal dimuat`);

//note setiap konten app shell di ubah revision: '1' juga di update
workbox.precaching.precacheAndRoute([{
		url: '/manifest.json',
		revision: '1'
	}, {
		url: '/css/materialize.min.css',
		revision: '1'
	},
	{
		url: '/js/idb.js',
		revision: '1'
	},
	{
		url: '/js/home.js',
		revision: '1'
	},
	{
		url: '/js/jquery-2.1.1.min.js',
		revision: '1'
	},
	{
		url: '/js/materialize.min.js',
		revision: '1'
	},
	{
		url: '/js/menu.js',
		revision: '1'
	},
	{
		url: '/js/api.js',
		revision: '1'
	},
	{
		url: '/js/db.js',
		revision: '1'
	},
	{
		url: '/menu.html',
		revision: '1'
	},
	{
		url: '/index.html',
		revision: '2'
	},
	{
		url: '/competitions.html',
		revision: '1'
	},
	{
		url: '/teams.html',
		revision: '1'
	},
	{
		url: '/standingId.html',
		revision: '1'
	},
	{
		url: '/pages/home.html',
		revision: '1'
	},
	{
		url: '/pages/standing.html',
		revision: '1'
	},
	{
		url: '/pages/saved_comp.html',
		revision: '1'
	},
	{
		url: '/pages/saved_team.html',
		revision: '1'
	},
	{
		url: '/images/logo_app.ico',
		revision: '1'
	}, {
		url: '/images/apel_icon.png',
		revision: '1'
	}, {
		url: '/images/logo_app.png',
		revision: '1'
	}, {
		url: '/images/img_null.jpg',
		revision: '1'
	}, {
		url: '/images/images.png',
		revision: '1'
	},
	{
		url: '/images/comps/BL1.png',
		revision: '1'
	},
	{
		url: '/images/comps/BSA.png',
		revision: '1'
	},
	{
		url: '/images/comps/CL.png',
		revision: '1'
	},
	{
		url: '/images/comps/DED.png',
		revision: '1'
	},
	{
		url: '/images/comps/EC.png',
		revision: '1'
	},
	{
		url: '/images/comps/ELC.png',
		revision: '1'
	},
	{
		url: '/images/comps/FL1.png',
		revision: '1'
	},
	{
		url: '/images/comps/PD.png',
		revision: '1'
	},
	{
		url: '/images/comps/PL.png',
		revision: '1'
	},
	{
		url: '/images/comps/PPL.png',
		revision: '1'
	},
	{
		url: '/images/comps/SA.png',
		revision: '1'
	},
	{
		url: '/images/comps/WC.png',
		revision: '1'
	},
], {
	// Ignore all URL parameters. for offline MOde
	ignoreURLParametersMatching: [/.*/]
});

//cache pages
workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'pages'
	})
);

workbox.routing.registerRoute(
	new RegExp(base_url),
	workbox.strategies.networkFirst({
		networkTimeoutSeconds: 3,
		cacheName: 'API_fottball_org',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 50,
				maxAgeSeconds: 50 * 60,
			}),
		],
	})
);


// ================ functions phusnotifications
self.addEventListener('push', function (event) {
	var body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = 'Push message no payload';
	}
	var options = {
		body: body,
		icon: 'images/images.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification('Push Notification', options)
	);
});