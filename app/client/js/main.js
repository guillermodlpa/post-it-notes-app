$(function(){

	$.ajax({
		url: window.location.pathname + 'todo'
	})
	.done(function( result ){
		alert(result);
	})
	.fail(function(){
		alert('fail');
	});

	var $adderForm = $('#todoListAdderForm');

	// override default form behavior so it is an ajax submission
	$adderForm.on('submit', function(){

		$.ajax({
			type: 'POST',
			url: window.location.pathname + 'todo/new',
			data: $adderForm.serialize()
		})
		.done( function( response ) {
			alert(response);
		})
		.fail( function() {
			alert('fail');
		});

		// stop submission
		return false;
	});

});