const publicVapidKey = "BM4SfBQbnG0g5RQgMetM6NmAo4lNMBZKnyD-yra0Ev2we2CVSM7zFAJl0ozB9GjePAWtP-MgVpctdO2G6Wvbc4o";

//check for service worker

if('serviceWorker' in navigator){
	send().catch(err=>console.error(err));
}


//register the service worker,push,send push
async function send() {
	//register service worker
	console.log('Registering service worker.....');
	const register=await navigator.serviceWorker.register('/worker.js',{
		scope:'/'
	});
	console.log('serviceWorker registered....')

	//Register Push

	console.log('Registering Push');

	const subscription=await register.pushManager.subscribe({
		userVisibleOnly:true,
		applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
	});
	console.log('push registered.....');

	//send push notification or subscription

	console.log('sending push....');
	await fetch('/subscribe',{
		method:'POST',
		body:JSON.stringify(subscription),
		headers:{
			'content-type':'application/json'
		}
	});
	console.log('push sent...');
}
//change the url to unit array

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}