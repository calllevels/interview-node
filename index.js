// const app = require("express")();
var express = require('express'); 
var app = express();
var x2j = require("xml2js");
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs'),imposible=false; 
var sendthemthis = "<head><script src='https://code.jquery.com/jquery-3.2.1.min.js'></script><script src='main.js'></script></head><body><div id='cont'></div></body>",ref={};


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static(__dirname+'/public'));


var datafile = 'data.json',content='';
function readit(){content = fs.readFileSync(datafile).toString(); return content;}
function reference(){
	var str = '',ret={};
	
	const req = http.get( {host: 'www.ecb.europa.eu',path:'/stats/eurofxref/eurofxref-daily.xml'},function (hores){ // inviting callback hell:start
	
		hores.on('data', function (chunk) {
              str += chunk;
        });

        hores.on('end', function () {
			var p = new x2j.Parser();
			
			p.parseString( str, function( err, re ) {
				re = re['gesmes:Envelope'].Cube[0].Cube[0].Cube;
				var stemp = {},ltemp = []
				
				re.forEach(function(v,i,o){ 
				// console.info(v.$)
				stemp[v.$.currency] = {};
				stemp[v.$.currency].rate = v.$.rate;
				try{
				   stemp[v.$.currency].treshold = doc[v.$.currency].treshold;
				}catch(e){}
				})
				ref = stemp;
			});
			
        });
	});
	req.end();
}
reference();

function sync(){
	writeit(ref);
	return readit();
}

function writeit(data){
	s = JSON.stringify( data, undefined, 3 );
	var fd = fs.openSync(datafile, 'w');
	fs.writeFileSync(datafile, s,  'utf8', function (err) {});
	fs.closeSync(fd)
	return s;
}
app.get("/", (req, res) => {
    
	res.send(sendthemthis);
	
});


app.post("/fetch", (req, res) => {
	var s= reference(),conto = [];
	if(content){
		conto = JSON.parse(content)
	}
	var s = sync();
	res.send(s.replace(/fix/ig,''));
});

app.get("/data", (req, res) => {
	content = readit();
	var clean = content.replace(/fix/ig,'')
	if(!clean){clean = '[]'}
	res.send(clean);
});

app.post("/update", (req, res) => {
	
	try{
		var re = JSON.parse(content),ga='';
			
		var post =req.body;
		
		Object.keys(re).forEach(function(val){
			if(post.cur[val] && post.rate){
				try{
					re[val].rate=	'fix'+post.cur[val];
				}catch(e){
					console.log(e)
				}
			}
			if(post.tres[val] && post.tres){
				try{
					re[val].treshold=	'fix'+post.tres[val];
				}catch(e){
					console.log(e)
				}
			}
			
		})
		
		s = writeit(re);
		res.send(readit().replace(/fix/ig,''));
	}catch(e){
		res.send(e);
	}
	
});


app.get("/cron", (req, res) => {
	
	try{
		var re = JSON.parse(content);
	
		Object.keys(re).forEach(function(k){ 
			
			try{
				if(parseFloat(re[k].treshold) < parseFloat(re[k].treshold)){
					// make alert here
				}
			}catch(e){}
			
		})
	}catch(e){
		res.send('[status:2]');
	}
	
});

app.post("/unset", (req, res) => {
	var re = JSON.parse(content = readit()),te={};
		
	try{
		var post = req.body;
		console.info(post);
		Object.keys(re).forEach(function(k){ 
			if(post.cur[k]){
				try{
					re[k].rate= ref[k].rate;
					delete re[k].treshold;
					
				} catch (e){
					
				}
			
			}else{
				// console.info(re[k].rate);
				try{
					re[k].rate= (re[k].rate.indexOf('fix') !== -1)?re[k].rate:ref[k].rate;
				} catch(e){}
			}
			
		})
		console.info(re);
	
		
		writeit(re);
		res.send(readit().replace(/fix/ig,''));
		
	}catch(e){
		console.info(e)
		res.send('[status:2]');
	}
	
});


var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on " + port);
});