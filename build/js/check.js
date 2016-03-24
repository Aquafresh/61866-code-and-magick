
function getMessage(a,b){

	var typeA = typeof(a);
	var typeB = typeof(b);

	if (typeA === 'boolean') {

		if(a === true) {

			console.log(a);

			var hitArea = 'Я попал в ' + b;

			return hitArea;
		}

		else {

			console.log(a);

			var hitMiss = 'Я никуда не попал';

			return hitMiss;
		}
	}

	// else if (typeA === 'boolean' && a === false){

	// 	var hitMiss = 'Я никуда не попал';

	// 	return hitMiss;
	// }

	else if (typeA == 'number'){

		console.log(typeA);

		var msgJumpCount = 'Я прыгнул на ' + (a * 100) + ' сантиметров';

		return msgJumpCount;
	}

	else if (typeA === 'object' && typeB !== 'object'){

		console.log(typeA);
		console.log(typeB);

		for( var i = 0; i < a.length; i++) {

			var sum = a.reduce(function(sum, current) {

				return sum + current;

			});
		}

		var msgStepCount = 'Я прошёл ' + sum + ' шагов';

		return msgStepCount;
	}

	else if (typeA === 'object' && typeB === 'object') {

		var newArrSum = [];

		for( var i = 0; i < a.length; i++) {

			var multiplyItem = a[i] * b[i];

			newArrSum.push(multiplyItem);

			var sumItem = newArrSum.reduce(function(sum, current) {

				return sum + current;
			});
		}

		var msgLenght = 'Я прошёл ' + sumItem + ' метров';

		return msgLenght;
	}
}
