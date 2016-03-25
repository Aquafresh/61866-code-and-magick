
function getMessage(a,b){

	if (typeof(a) === 'boolean') {

		if(a) {

			return 'Я попал в ' + b;
		}

		else {

			return 'Я никуда не попал';
		}
	}

	else if (typeof(a) === 'number'){

		return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
	}

	else if (Array.isArray(a) && !Array.isArray(b)){

		var sum = a.reduce(function(sum, current) {

			return sum + current;

		});

		return 'Я прошёл ' + sum + ' шагов';
	}

	else if (Array.isArray(a) && Array.isArray(b)) {

		var sumArrayA = a.reduce(function(sum, current) {
			return sum + current;
		});

		var sumArrayB = b.reduce(function(sum, current) {
			return sum + current;
		});

		var globalSum = sumArrayA + sumArrayB;

		return 'Я прошёл ' + globalSum + ' метров';
	}


	else{

		return 'Что-то пошло не так';
	}
}
