var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var request = require('request')

var userSchema = require('../models/users')

var User = mongoose.model('User', userSchema)
var urlencodedParser = bodyParser.urlencoded({extended:false})

module.exports = function(app, passport) {
	app.get('/', function(req, res){
		if (req.isAuthenticated()) {
			var url = 'https://avatars3.githubusercontent.com/u/'+req.user.github.id+'?v=3&s=40'
			var u = '<img src="'+url+'"/>'
			localStorage['logged-in'] = true;
			if (!localStorage.hasOwnProperty('query'))
				res.render('list', {barsPresent: false, bars: [],symbol: u, id: true, city: ''})
			else {
				res.render('list', {barsPresent: true, bars: localStorage['bars'],symbol: u, id: true, city: localStorage['query'].toString()})
			}
		}
		else {
			var u = '<i class="fa fa-github-square"></i>'
			localStorage['logged-in'] = false;
			res.render('list', {barsPresent: false, bars: [] ,symbol: u, id: false, city: ''})
		}
	})

	app.post('/', urlencodedParser, function(req, res){
		var location = req.body.location
		localStorage['query'] =  location.toString();

		var date = new Date()
		var version = date.getFullYear().toString()+formatDate((date.getMonth()+1).toString())+formatDate(date.getDate().toString())
		var apiEndPoint = 'https://api.foursquare.com/v2/venues/explore?near='+location+'&query=nightlife&v='+version+'&client_id='+process.env.FSQ_CLIENT_ID+'&client_secret='+process.env.FSQ_CLIENT_SECRET
		console.log(apiEndPoint);
		request.get(apiEndPoint, function(err, response, body){
			if (!err && response.statusCode===200) {
				var receivedData = JSON.parse(body)
				var data = receivedData.response.groups[0].items.slice(0,10)
				var displayLocation = receivedData.response.geocode.where
				var bars = []
				data.forEach(function(bar) {
					var b={}
					b.name = bar.venue.name
					b.rating = bar.venue.rating
					b.ratingColor  = '#'+bar.venue.ratingColor.toString()
					b.review = bar.tips[0].text
					b.id = bar.venue.id
					b.status = false;
					bars.push(b)
				})

				var u = req.isAuthenticated()? '<img src="'+'https://avatars3.githubusercontent.com/u/'+req.user.github.id+'?v=3&s=40'+'"/>': '<i class="fa fa-github-square"></i>'
				localStorage['bars'] = bars;
				if (req.isAuthenticated()) {
					res.render('list', {barsPresent: true, bars: bars,symbol: u, id: true, city: location});
				}
				else {
					res.render('list', {barsPresent: true, bars: bars,symbol: u, id: false, city: location});
				}
			}
		})
	})

	app.get('/api/auth', function(req, res){
		res.send(req.isAuthenticated());
	})

	app.get('/login', function(req, res) {
		res.redirect('/auth/github')
	})

	app.get('/logout', function(req, res) {
		if (req.isAuthenticated()) {
			req.logout()
		}
		res.redirect('/')
	})

	app.get('/auth/github', passport.authenticate('github'))

	app.get('/auth/github/callback', passport.authenticate('github', {
		successRedirect: '/',
		failureRedirect: '/login'
	}))
}

function formatDate(date) {
	return date.length===1?'0'+''+date:date
}