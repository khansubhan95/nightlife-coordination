$(document).ready(function(){

	$('.going-counter').each(function(){
		var gng = $(this)
		var gngId = $(gng).attr('id')
		if(sessionStorage.hasOwnProperty(gngId)){
			$(gng).html(sessionStorage[gngId])
		}
	})

	$('.going-counter').on('click', function(){
		var gng = $(this)
		var gngId = $(gng).attr('id');
		$.ajax({
			url: '/api/auth',
			type: 'GET',
			success: function(data) {
				if (data) {
					if($(gng).html() === 'I am going') {
						$(gng).html('I am not going')
						sessionStorage.setItem(gngId.toString(), 'I am not going')
					}

					else {
						$(gng).html('I am going')
						sessionStorage.setItem(gngId.toString(), 'I am going')
					}

				}
				else
					window.location.replace('/login');
			}
		})
	})
})