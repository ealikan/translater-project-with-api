const languages = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}
const fromLang = document.querySelector("#from-lang")
const toLang = document.querySelector("#to-lang")
const btnTranslate = document.querySelector("#btnTranslate")
const fromText = document.querySelector("#from-text")
const toText = document.querySelector("#to-text")
const exchange = document.querySelector(".exchange")
const icons = document.querySelectorAll(".icons")




for(let lang in languages){
    let option = `<option value="${lang}">${languages[lang]}</option>`
    fromLang.insertAdjacentHTML("beforeend",option)
    toLang.insertAdjacentHTML("beforeend",option)

    fromLang.value = "tr-TR"
    toLang.value = "en-GB"
}

btnTranslate.addEventListener("click",()=>{
    let text = fromText.value
    let from = fromLang.value
    let to = toLang.value
    
    const url = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${from}|${to}`

    fetch(url)
    .then(res =>res.json())
    .then(data =>{
        toText.value = data.responseData.translatedText
    })
})

exchange.addEventListener("click",()=>{
    let text = fromText.value
    fromText.value = toText.value
    toText.value = text

    let lang = fromLang.value
    fromLang.value=toLang.value
    toLang.value=lang
})

for(let icon of icons){
    icon.addEventListener("click",(element)=>{
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id == "from"){
                navigator.clipboard.writeText(fromText.value)

            }else{
                navigator.clipboard.writeText(toText.value)
            }
        }else{
            let utterance
            if(element.target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = fromLang.value
            }else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLang.value
            }
            speechSynthesis.speak(utterance)
        }
    })
}
