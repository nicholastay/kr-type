// ------------------------------------------------------------------------
// Data - For now, let's just do the green highlighted ones on wikipedia
// Other ones probably not gonna encounter lol
// List the compatability then we can convert to this form.
var HANGUL_MAPPINGS = {
	// compatibility block
	'12593': 'r', // ㄱ 
	'12594': 'R', // ㄲ
	'12595': 'rt', // ㄳ
	'12596': 's', // ㄴ
	'12597': 'sw', // ㄵ
	'12598': 'sg', // ㄶ
	'12599': 'e', // ㄷ
	'12600': 'E', // ㄸ
	'12601': 'f', // ㄹ
	'12602': 'fr', // ㄺ
	'12603': 'fa', // ㄻ
	'12604': 'fq', // ㄼ
	'12605': 'ft', // ㄽ
	'12606': 'fx', // ㄾ
	'12607': 'fv', // ㄿ
	'12608': 'fg', // ㅀ
	'12609': 'a', // ㅁ
	'12610': 'q', // ㅂ
	'12611': 'Q', // ㅃ
	'12612': 'qt', // ㅄ
	'12613': 't', // ㅅ
	'12614': 'T', // ㅆ
	'12615': 'd', // ㅇ
	'12616': 'w', // ㅈ
	'12617': 'W', // ㅉ
	'12618': 'c', // ㅊ
	'12619': 'z', // ㅋ
	'12620': 'x', // ㅌ
	'12621': 'v', // ㅍ
	'12622': 'g', // ㅎ
	'12623': 'k', // ㅏ
	'12624': 'o', // ㅐ
	'12625': 'i', // ㅑ
	'12626': 'o', // ㅐ
	'12627': 'j', // ㅓ
	'12628': 'p', // ㅔ
	'12629': 'u', // ㅕ
	'12630': 'P', // ㅖ
	'12631': 'h', // ㅗ
	'12632': 'hk', // ㅘ
	'12633': 'ho', // ㅙ
	'12634': 'hl', // ㅚ
	'12635': 'y', // ㅛ
	'12636': 'n', // ㅜ
	'12637': 'nj', // ㅝ
	'12638': 'np', // ㅞ
	'12639': 'nl', // ㅟ
	'12640': 'b', // ㅠ
	'12641': 'm', // ㅡ
	'12642': 'ml', // ㅢ
	'12643': 'l'  // ㅣ
};

var SYLLABLE_COMPAT_MAPPING = {
	// first bit (initial)
	// the very start is a cbs - just gonna map manual
	// but later 4361-4370 = 12613-12622
	'4352': '12593', // ㄱ
	'4353': '12594', // ㄲ
	'4354': '12596', // ㄴ
	'4355': '12599', // ㄷ
	'4356': '12600', // ㄸ
	'4357': '12601', // ㄹ
	'4358': '12609', // ㅁ
	'4359': '12610', // ㅂ
	'4360': '12611'  // ㅃ

	// second bit (medial)
	// the medials actually line up. so lets use an algo
	// 4449-4469 = 12623-12643
	// therefore: 
	//               medial + 8174 = compat

	// third bit (final)
	// theres sort of an algo here too
	//
	// 4520-4526 = 12593-12599
	// 4527-4536 = 12601-12602
	// 4537-4541 = 12612-12616
	// 4542-4546 = 12618-12622
	// so i guess when we reach these "checkpoint" numbers, we can add one.
};
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
			(cc >= 4352 && cc <= 4370) || // \u1100 - \u1112 = initial
			(cc >= 4449 && cc <= 4469) || // \u1161 - \u1175 = medial
			(cc >= 4520 && cc <= 4546) || // \u11A8 - \u11C2 = final
			(cc >= 12593 && cc <= 12643)  // \u3131 - \u3163 = compat block
		)) {
			output += c;
			continue;
		}


		// compat itself
		if (cc >= 12593 && cc <= 12643) {
			output += HANGUL_MAPPINGS[cc];
		}

		// initial
		else if (cc >= 4352 && cc <= 4370) {
			if (cc < 4361) {
				output += HANGUL_MAPPINGS[SYLLABLE_COMPAT_MAPPING[cc]];
			} else {
				output += HANGUL_MAPPINGS[cc + 8252];
			}
		}

		// medial
		else if (cc >= 4449 && cc <= 4469) { 
			output += HANGUL_MAPPINGS[cc + 8174];
		}

		// final
		else {
			var incr = 0;
			if (cc > 4527)
				++incr;
			if (cc > 4537)
				++incr;
			if (cc > 4542)
				++incr;

			output += HANGUL_MAPPINGS[cc + incr + 8073];
		}
	}

	document.getElementById('output').value = output;
}