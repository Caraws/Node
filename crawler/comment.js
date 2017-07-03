var http = require("http")
//序列化
var querystring = require("querystring")





//xvar postData = null;
var contents = [];
var str = "";
for(var i = 0 ; i < 10 ; i++){
	str = 'Hello World!'+ i;
	contents.push(str)
	
}
var num = Math.ceil(Math.random()*100)
var postData = querystring.stringify({
		'content' : num,
		'mid' :  4063822735889545
	})

//这个地方获取Request Headers的信息
var options = {
	hostname : "weibo.com",
	port : 80,
	path : "/aj/v6/comment/add?ajwvr=6&__rnd=1484379146752",
	method : "POST",
	headers :{
		'Accept':'*/*',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded',
		'Cookie':'SINAGLOBAL=108602404673.94312.1480329864760; wb_g_upvideo_1799171033=1; YF-Ugrow-G0=9642b0b34b4c0d569ed7a372f8823a8e; login_sid_t=4407a689f595d7d834ecdb075ef2934a; YF-V5-G0=731b77772529a1f49eac82a9d2c2957f; WBStorage=5d1a8eee17d84880|undefined; _s_tentry=-; UOR=,,www.baidu.com; Apache=4327619828031.042.1484375488844; ULV=1484375488849:5:2:1:4327619828031.042.1484375488844:1483358843808; SCF=At1eMPJAluLWilzxm9gAx5w5DuOzlaB62z_Ha5iZsvsh1wQrd8i3m4UfwKuP1LUDifTp7BRu-tYj8xBsv3L1pfY.; SUB=_2A251fbWCDeRxGedJ4lsQ9y_MyD-IHXVWCqBKrDV8PUNbmtBeLUPSkW-FjF5oisime90PW-gLqQQ9n238Tw..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9W5frK_YzDn56iMYHPv_ic7X5JpX5K2hUgL.Fo2N1K.pS027e0e2dJLoI0YLxKBLB.eL1-2LxKqLB.BL1-eLxKqLBo5LBoBLxKML1-2L1hBLxK.LBKeL1--LxK.LBonL1-qLxKBLBonLBoqt; SUHB=0ebsvCoZxLrFOg; ALF=1515911506; SSOLoginState=1484375506; un=1063330756@qq.com; wvr=6; YF-Page-G0=cf25a00b541269674d0feadd72dce35f',
		'Host':'weibo.com',
		'Origin':'http://weibo.com',
		'Referer':'http://weibo.com/0fairfarren0?is_all=1',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}


var req = http.request(options,function(res){
	console.log("Status:" + res.statusCode)
	console.log("headers" + JSON.stringify(res.headers))

	res.on("data",function(chunk){
		console.log(Buffer.isBuffer(chunk))
		console.log(typeof chunk)
	})

	res.on('end',function(){
		console.log("ok")
		console.log(postData)
	})

	res.on('error',function(e){
		console.log('Error' + e.message)
	})


})



	req.write(postData)
	req.end()

	

