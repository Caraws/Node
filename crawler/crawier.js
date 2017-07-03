/*网页小爬虫  ----- 2017-1-14 By Cara*/

var http = require ("http");

//一个模块 跟JQ一毛一样
var cheerio = require("cheerio");

//需要爬虫的网页地址
var URL = "http://www.imooc.com/learn/348";




function filterJavaScript (html) {
	var $ = cheerio.load(html)
	//拿到每一大章
	var chapters = $(".chapter ")
	//大概的数据的数据结构
	/*[{
		chapterTitle : "",
		videos : [
			title : "",
			id : ""
		]
	}]*/

	//用来存放所有数据
	var courseData = [] 
	chapters.each(function(item){
		var chapter = $(this)
		//大章标题
		var chapterTitle = chapter.find("strong").text()
		var videos = chapter.find(".video").children("li")
		//数据结构
		var chapterData = {
			chapterTitle : chapterTitle,
			videos : []
		}
		//遍历对象
		videos.each(function (item) {
			var videos = chapter.find('.J-media-item')
			//video标题
			var videoTitle = videos.text()
			//在href中拿到id
			var videoId = videos.attr("href").split("video/")[1]
			//放入videos数组
			chapterData.videos.push({
				videoTitle : videoTitle,
				id : videoId
			})
		})
		//所有内容放入数组
		courseData.push(chapterData)
	})
	//返回结果
	return courseData
}

function printCourseInfo (course) {
	//forEach是遍历数组
	course.forEach(function (item) {
		//打印标题
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle + "\n")
		//打印video的id和标题
		item.videos.forEach(function (video) {
			console.log("[" + video.id + "]" + video.videoTitle + "\n")
		})
	})
}

http.get(URL,function(res){
	var html = "" ;
	res.on("data",function (data) {
		//data拿到html内容额数据
		html += data
	})

	res.on("end",function () {
		//请求结束时打印html
		//console.log(html)

		/*把html内容通过回调函数来过滤*/
		var courseData = filterJavaScript(html)
		//结果打印大章标题和video内容
		printCourseInfo(courseData)
	})

	res.on("error" , function (error) {
		console.log(error)
	})
})

