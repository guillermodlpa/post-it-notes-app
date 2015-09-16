$(function(){

	// clicking on the button to trigger a save on MongoDB
	$('button').on('click', function(){
		$.ajax({
			url: window.location.pathname + 'increaseCounter'
		})
		.done(function( result ){
			alert(result);
		})
		.fail(function(){
			alert('fail');
		});
	});

});