console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Have a great experience",
    icon:"https://images.app.goo.gl/PyJXLUaxmsP2Qnbd6"
  });
}); 