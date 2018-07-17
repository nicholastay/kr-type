// ------------------------------------------------------------------------
// Data - For now, let's just do the green highlighted ones on wikipedia
// Other ones probably not gonna encounter lol
var HANGUL_MAPPINGS = {
	'4352': 'r', // ㄱ
	'4353': 'R', // ㄲ
	'4354': 's', // ㄴ
	'4355': 'e', // ㄷ
	'4356': 'E', // ㄸ
	'4357': 'f', // ㄹ
	'4358': 'a', // ㅁ
	'4359': 'q', // ㅂ
	'4360': 'Q', // ㅃ
	'4361': 't', // ㅅ
	'4362': 'T', // ㅆ
	'4363': 'd', // ㅇ
	'4364': 'w', // ㅈ
	'4365': 'W', // ㅉ
	'4366': 'c', // ㅊ
	'4367': 'z', // ㅋ
	'4368': 'x', // ㅌ
	'4369': 'v', // ㅍ
	'4370': 'g', // ㅎ

	'4449': 'k', // ㅏ
	'4450': 'o', // ㅐ
	'4451': 'i', // ㅑ
	'4452': 'O', // ㅒ
	'4453': 'j', // ㅓ
	'4454': 'p', // ㅔ
	'4455': 'u', // ㅕ
	'4456': 'P', // ㅖ
	'4457': 'h', // ㅗ
	'4458': 'hk', // ㅘ
	'4459': 'ho', // ㅙ
	'4460': 'hl', // ㅚ
	'4461': 'y', // ㅛ
	'4462': 'n', // ㅜ
	'4463': 'nj', // ㅝ
	'4464': 'np', // ㅞ
	'4465': 'nl', // ㅟ
	'4466': 'b', // ㅠ
	'4467': 'm', // ㅡ
	'4468': 'ml', // ㅢ
	'4469': 'l', // ㅣ

	'4520': 'r', // ㄱ
	'4521': 'R', // ㄲ
	'4522': 'rt', // ㄳ
	'4523': 's', // ㄴ
	'4524': 'sw', // ㄵ
	'4525': 'sg', // ㄶ
	'4526': 'e', // ㄷ
	'4527': 'f', // ㄹ
	'4528': 'fr', // ㄺ
	'4529': 'fa', // ㄻ
	'4530': 'fq', // ㄼ
	'4531': 'ft', // ㄽ
	'4532': 'fx', // ㄾ
	'4533': 'fv', // ㄿ
	'4534': 'fg', // ㅀ
	'4535': 'a', // ㅁ
	'4536': 'q', // ㅂ
	'4537': 'qt', // ㅄ
	'4538': 't', // ㅅ
	'4539': 'T', // ㅆ
	'4540': 'd', // ㅇ
	'4541': 'w', // ㅈ
	'4542': 'c', // ㅊ
	'4543': 'z', // ㅋ
	'4544': 'x', // ㅌ
	'4545': 'v', // ㅍ
	'4546': 'g'  // ㅎ
}
// ------------------------------------------------------------------------

function convert() {
	var input = document.getElementById('input').value;
	var inputN = input.normalize('NFD'); // normalize to destructured unicode
	var output = '';
	for (var i = 0; i < inputN.length; ++i) {
		var c = inputN[i]; // the character in question
		var cc = c.charCodeAt(0);

		// are we hangul? if not, lets get out
		if (!(
			(cc >= 4352 && cc <= 4370) || // \u1100 - \u1112 = 1st bit, conso
			(cc >= 4449 && cc <= 4469) || // \u1161 - \u1175 = 2nd bit, vowel
			(cc >= 4520 && cc <= 4546)    // \u11A8 - \u11C2 = 3rd bit, conso
		)) {
			output += c;
			continue;
		}

		output += HANGUL_MAPPINGS[cc];
	}

	document.getElementById('output').value = output;
}

function inkey() {
	if (event.keyCode === 13) // enter
		convert();
}