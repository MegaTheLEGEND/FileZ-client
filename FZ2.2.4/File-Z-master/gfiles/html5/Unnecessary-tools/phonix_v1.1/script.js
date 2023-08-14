document.addEventListener('DOMContentLoaded', function () {
    const inputText = document.getElementById('inputText');
    const replaceButton = document.getElementById('replaceButton');
    const phoneticDiv = document.getElementById('phonetic');
    const unnecessaryOutput = document.getElementById('outputSecondary');


    const Combos_plus_vowels = {
        // B
        'bl': 'bil',
        'br': 'bur',
        // C
        'cl': 'cil',
        'cr': 'cur',
        'ck': 'k',
        // D
        'dr': 'dur',
        'dg': 'g',
        // F
        'fl': 'fil',
        'fr': 'fur',
        // G
        'gh': 'g',
        'gl': 'gil',
        'gr': 'gur',
        'gn': 'n',
        // H
        // J
        // K
        'kl': 'kal',
        'kr': 'kor',
        // L
        'ld': 'led',
        'lp': 'lep',
        // M
        'mc': 'mic',
        'mb': 'mib',
        // N we will come back
        // P
        'pl': 'pil',
        'pr': 'pur',
        'ph': 'f',
        'pn': 'n',
        // Q we will come back
        // R
        // S
        'sc': 'suc',
        'sh': 'suh',
        'sk': 'sik',
        'sl': 'sil',
        'sm': 'sum',
        'sn': 'sin',
        'sp': 'sup',
        'sq': 'soq',
        'sr': 'sur',
        'st': 'sit',
        'sw': 'suw',
        // T
        'th': 'teh',
        'tr': 'tur',
        'tw': 'tuw',
        // V
        'vl': 'vil',
        'vr': 'vur',
        // W
        'wr': 'wur',
        // 'wh': '2',
        // X
        'xt': 'xet',
        // Z
        'zl': 'zil',
        'zr': 'zur'
        // this is for consonant combos like th, sh, and ch, etc...
        // i guess numbers could be added here to.
    };



    replaceButton.addEventListener('click', function () {
        const english = inputText.value.toLowerCase(); // Convert input to lowercase

        if (english) {
            const var1 = process_English_Layer_1(english);
            const newcombos = process_English_Layer_2(var1);
            const phonetic_unnecessary = process_English_Layer_3(newcombos);
            phoneticDiv.textContent = phonetic_unnecessary;
            unnecessaryOutput.textContent = newcombos;
        } else {
            phoneticDiv.textContent = 'Please enter input text.';
        }
    });


    function process_English_Layer_1(english) {


        // Step 1: Perform first layer of character replacements for consonant combos
        let replacedText = english;
        for (const findChar in Combos_plus_vowels) {
            if (Combos_plus_vowels.hasOwnProperty(findChar)) {
                const replaceChar = Combos_plus_vowels[findChar];
                const regex = new RegExp(findChar, 'g');
                replacedText = replacedText.replace(regex, replaceChar);
            }
        }

        console.log("Layer 1 (common): " + replacedText)

        return replacedText;
    }


    function process_English_Layer_2(var1) {
        // Step 2: Perform second layer of character replacements for uncommon letter combos
        const L_consonants = 'bcdfghjkmnpqrstvwxyz'; // excluding L
        const M_consonants = 'bcdfghjklnpqrstvwxyz'; // excluding M
        const R_consonants = 'bcdfghjklmnpqstvwxyz'; // excluding R
        const S_consonants = 'bcdfghjklmnpqrtvwxyz'; // excluding S
        const W_consonants = 'bcdfghjklmnpqrstvxyz'; // excluding W
        const N_consonants = 'bcdfghjklmpqrstvwxyz'; // excluding N

        const list_2 = {};

        // L + con = L + e + con
        for (let i = 0; i < L_consonants.length; i++) {
            const L_consonant = L_consonants.charAt(i);
            list_2['l' + L_consonant] = 'le' + L_consonant;
        }

        // M + con = M + i + con
        for (let i = 0; i < M_consonants.length; i++) {
            const M_consonant = M_consonants.charAt(i);
            list_2['m' + M_consonant] = 'mi' + M_consonant;
        }

        // R + con = R + o + con
        for (let i = 0; i < R_consonants.length; i++) {
            const R_consonant = R_consonants.charAt(i);
            list_2['r' + R_consonant] = 'ro' + R_consonant;
        }

        // S + con = S + u + con
        for (let i = 0; i < S_consonants.length; i++) {
            const S_consonant = S_consonants.charAt(i);
            list_2['s' + S_consonant] = 'su' + S_consonant;
        }

        // W + con = W + a + con
        for (let i = 0; i < W_consonants.length; i++) {
            const W_consonant = W_consonants.charAt(i);
            list_2['w' + W_consonant] = 'wa' + W_consonant;
        }

        // N + con = N + a + con
        for (let i = 0; i < N_consonants.length; i++) {
            const N_consonant = N_consonants.charAt(i);
            list_2['n' + N_consonant] = 'na' + N_consonant;
        }


        let replacedText = var1;
        for (const findChar in list_2) {
            if (list_2.hasOwnProperty(findChar)) {
                const replaceChar = list_2[findChar];
                const regex = new RegExp(findChar, 'g');
                replacedText = replacedText.replace(regex, replaceChar);
            }
        }

        console.log("Layer 2 (uncommon): " + replacedText);

        return replacedText;
    }



    function process_English_Layer_3(newcombos) {
   // Step 3: Perform third layer of character replacements for full alphabet and "y" logic
        var words = newcombos.toLowerCase().split(' ');
        var phoneticArray = [];

        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var phoneticWord = getPhoneticTranscription(word);

            phoneticArray.push('/' + phoneticWord + '/');
        }

        return phoneticArray.join(' ');
    }

    function isYAVowel(char) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(char) !== -1;
    }

    function getPhoneticTranscription(word) {
        var phoneticMap = {
            'a': 'o',
            'b': 'f',
            'c': '-ex-',
            'd': 'h',
            'e': 'u',
            'f': 'b',
            'g': 'k',
            'h': 'd',
            'i': 'a',
            'j': 'm',
            'k': 'g',
            'l': 'p',
            'm': 'j',
            'n': 'r',
            'o': 'e',
            'p': 'l',
            'q': 't',
            'r': 'n',
            's': 'w',
            't': 'q',
            'u': 'i',
            'v': 'z',
            'w': 's',
            'x': '-yuh-',
            'y': 'k',   // Default translation for 'y' as a consonant
            'z': 'v'
        };


        var phoneticWord = '';
        var prevChar = '';  // Keep track of the previous character for 'y' logic

        for (var j = 0; j < word.length; j++) {
            var char = word.charAt(j);

            if (char === 'y') {
                if (j === 0 || isYAVowel(word.charAt(j - 1))) {
                    phoneticWord += 'k';
                } else {
                    phoneticWord += 'u';
                }
            } else if (phoneticMap.hasOwnProperty(char)) {
                phoneticWord += phoneticMap[char];
            } else {
                phoneticWord += char;
            }
        }

        return phoneticWord;
    }

});
