const express =require('express');
const webpush =require('web-push');
const bodyParser =require('body-parser');
const path =require('path');


const app=express();

//set static path

app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());

const publicVapidKey = "BM4SfBQbnG0g5RQgMetM6NmAo4lNMBZKnyD-yra0Ev2we2CVSM7zFAJl0ozB9GjePAWtP-MgVpctdO2G6Wvbc4o";
const privateVapidKey = "-mxORhBmr6gUosp0y56p2waHFmhvgYXL3KnYWXVyvGk";

webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);

// Subscribe Route

app.post('/subscribe',(req,res)=> {
	//Get pushsubscription object
	const subscription=req.body;

	// send 201 - resource created

	res.status(201).json({});

	//create payload

	const payload = JSON.stringify({ title:"Welcome"});
	
	//pass object into sendnotification
	
	webpush.sendNotification(subscription,payload).catch(err=>console.error(err));

});

const port = 4000;

app.listen(port,()=>console.log(`server started on port ${port}`));


