/**
 * @author  Shuichiro Endo
 * @copyright Crown Copyright 2023
 * @license Apache-2.0
 */

import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

/**
 * LibreTranslate operation
 */
class LibreTranslate extends Operation {

    /**
     * LibreTranslate constructor
     */
    constructor() {
        super();

        this.name = "LibreTranslate";
        this.module = "Default";
        this.description = "";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "url",
                type: "string",
                value: "http://127.0.0.1:5000/translate"
            },
            {
                name: "source lang",
                type: "option",
                value: [
                            "en",
                            "ar",
                            "az",
                            "ca",
                            "zh",
                            "cs",
                            "da",
                            "nl",
                            "eo",
                            "fi",
                            "fr",
                            "de",
                            "el",
                            "he",
                            "hi",
                            "hu",
                            "id",
                            "ga",
                            "it",
                            "ja",
                            "ko",
                            "fa",
                            "pl",
                            "pt",
                            "ru",
                            "sk",
                            "es",
                            "sv",
                            "tr",
                            "uk",
                            "auto"
                ]
            },
            {
                name: "target lang",
                type: "option",
                value: [
                            "en",
                            "ar",
                            "az",
                            "ca",
                            "zh",
                            "cs",
                            "da",
                            "nl",
                            "eo",
                            "fi",
                            "fr",
                            "de",
                            "el",
                            "he",
                            "hi",
                            "hu",
                            "id",
                            "ga",
                            "it",
                            "ja",
                            "ko",
                            "fa",
                            "pl",
                            "pt",
                            "ru",
                            "sk",
                            "es",
                            "sv",
                            "tr",
                            "uk"
                ]
            },
            {
                name: "api key",
                type: "string",
                value: ""
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     */
    async run(input, args) {
        const [url, source_lang, target_lang, api_key] = args;

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    q: `${input}`,
                    source: `${source_lang}`,
                    target: `${target_lang}`,
                    format: "text",
                    api_key: `${api_key}`
                }),
                headers: { "Content-Type": "application/json" }
            });
            
            const output = await res.json();
//            console.log(output);
            return output.translatedText;    // change Output character encoding from Raw Bytes to UTF-8.
        } catch (err) {
            throw new OperationError("Error");
        }
    }
}

export default LibreTranslate;
