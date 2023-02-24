(function($) {
	$(document).ready(function() {
		$('.choice').on('click', function(e) {
			$('.choice').removeClass('selected');
			$(this).addClass('selected');
			$('.custom-tip').val('');
			calculate();
		});
		
		$('input[type="number"]').on('change, keyup', function() {
			calculate();
		});

		$('.custom-tip').on('click', function(e) {
			$('.choice').removeClass('selected');
			$('input[name="tip"]').prop('checked', false);
		});

		$('.btn-reset').on('click', function(e) {
			e.preventDefault();
			document.getElementById('page-form').reset();
			$('.form-field').empty();
			$('.choice').removeClass('selected');
			$('#tipVal').val('0.00');
			$('#totalVal').val('0.00');
		});
	});

	function calculate() {
		var tipVal = '0.00';
		var totalVal = '0.00';
		var bill = parseFloat($('#bill').val());
		var tip = $('input[name="tip"]:checked').val();
		var customTip = $('.custom-tip').val();
		var clientsNo = parseFloat($('#clients').val());

		if ( bill > 0 && clientsNo > 0 ) {

			if ( tip !='' && customTip =='' ) {
				tipVal = ( bill * parseFloat(tip) / 100 / clientsNo ).toFixed(2);
				totalVal = ( ( bill + ( tipVal * clientsNo ) ) / clientsNo ).toFixed(2);
			} 

			if( tip === undefined && customTip !== '' ) {
				tipVal = ( bill * parseFloat(customTip) / 100 / clientsNo ).toFixed(2);
				totalVal = ( ( bill + ( tipVal * clientsNo ) ) / clientsNo ).toFixed(2);
			}

			if( tip === undefined && customTip =='' ) {
				tipVal = '0.00';
				totalVal = ( bill / clientsNo ).toFixed(2);
			}
			
		} else if ( isNaN(clientsNo) && bill >= 0 ) {
			totalVal = bill.toFixed(2);
		}

		$('#tipVal').text(tipVal);
		$('#totalVal').text(totalVal);
	}
})(jQuery);