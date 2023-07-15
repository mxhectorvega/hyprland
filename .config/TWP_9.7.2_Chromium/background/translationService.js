"use strict";

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
const translationService = function () {
  const translationService = {};
  class Utils {
    /**
     * Replace the characters `& < > " '` with `&amp; &lt; &gt; &quot; &#39;`.
     * @param {string} unsafe
     * @returns {string} escapedString
     */
    static escapeHTML(unsafe) {
      return unsafe.replace(/\&/g, "&amp;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;");
    }

    /**
     * Replace the characters `&amp; &lt; &gt; &quot; &#39;` with `& < > " '`.
     * @param {string} unsafe
     * @returns {string} unescapedString
     */
    static unescapeHTML(unsafe) {
      return unsafe.replace(/\&amp;/g, "&").replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(/\&quot;/g, '"').replace(/\&\#39;/g, "'");
    }
  }
  class GoogleHelper {
    static get googleTranslateTKK() {
      return "448487.932609646";
    }

    /**
     *
     * @param {number} num
     * @param {string} optString
     * @returns {number}
     */
    static shiftLeftOrRightThenSumOrXor(num, optString) {
      for (let i = 0; i < optString.length - 2; i += 3) {
        /** @type {string|number} */
        let acc = optString.charAt(i + 2);
        if ("a" <= acc) {
          acc = acc.charCodeAt(0) - 87;
        } else {
          acc = Number(acc);
        }
        if (optString.charAt(i + 1) == "+") {
          acc = num >>> acc;
        } else {
          acc = num << acc;
        }
        if (optString.charAt(i) == "+") {
          num += acc & 4294967295;
        } else {
          num ^= acc;
        }
      }
      return num;
    }

    /**
     *
     * @param {string} query
     * @returns {Array<number>}
     */
    static transformQuery(query) {
      /** @type {Array<number>} */
      const bytesArray = [];
      let idx = 0;
      for (let i = 0; i < query.length; i++) {
        let charCode = query.charCodeAt(i);
        if (128 > charCode) {
          bytesArray[idx++] = charCode;
        } else {
          if (2048 > charCode) {
            bytesArray[idx++] = charCode >> 6 | 192;
          } else {
            if (55296 == (charCode & 64512) && i + 1 < query.length && 56320 == (query.charCodeAt(i + 1) & 64512)) {
              charCode = 65536 + ((charCode & 1023) << 10) + (query.charCodeAt(++i) & 1023);
              bytesArray[idx++] = charCode >> 18 | 240;
              bytesArray[idx++] = charCode >> 12 & 63 | 128;
            } else {
              bytesArray[idx++] = charCode >> 12 | 224;
            }
            bytesArray[idx++] = charCode >> 6 & 63 | 128;
          }
          bytesArray[idx++] = charCode & 63 | 128;
        }
      }
      return bytesArray;
    }

    /**
     * Calculates the hash (TK) of a query for google translator.
     * @param {string} query
     * @returns {string}
     */
    static calcHash(query) {
      const windowTkk = GoogleHelper.googleTranslateTKK;
      const tkkSplited = windowTkk.split(".");
      const tkkIndex = Number(tkkSplited[0]) || 0;
      const tkkKey = Number(tkkSplited[1]) || 0;
      const bytesArray = GoogleHelper.transformQuery(query);
      let encondingRound = tkkIndex;
      for (const item of bytesArray) {
        encondingRound += item;
        encondingRound = GoogleHelper.shiftLeftOrRightThenSumOrXor(encondingRound, "+-a^+6");
      }
      encondingRound = GoogleHelper.shiftLeftOrRightThenSumOrXor(encondingRound, "+-3^+b+-f");
      encondingRound ^= tkkKey;
      if (encondingRound <= 0) {
        encondingRound = (encondingRound & 2147483647) + 2147483648;
      }
      const normalizedResult = encondingRound % 1000000;
      return normalizedResult.toString() + "." + (normalizedResult ^ tkkIndex);
    }
  }
  class YandexHelper {
    static get translateSid() {
      return _classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _translateSid);
    }

    /**
     * Find the SID of Yandex Translator. The SID value is used in translation requests.
     * @returns {Promise<void>}
     */
    static async findSID() {
      if (_classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _findPromise)) return await _classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _findPromise);
      _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _findPromise, new Promise(resolve => {
        let updateYandexSid = false;
        if (_classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _lastRequestSidTime)) {
          const date = new Date();
          if (_classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _translateSid)) {
            date.setMinutes(date.getMinutes() - 30);
          } else if (_classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _SIDNotFound)) {
            date.setMinutes(date.getMinutes() - 5);
          } else {
            date.setMinutes(date.getMinutes() - 1);
          }
          if (date.getTime() > _classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _lastRequestSidTime)) {
            updateYandexSid = true;
          }
        } else {
          updateYandexSid = true;
        }
        if (updateYandexSid) {
          _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _lastRequestSidTime, Date.now());
          const http = new XMLHttpRequest();
          http.open("GET", "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=es&widgetTheme=light&autoMode=false");
          http.send();
          http.onload = e => {
            const result = http.responseText.match(/sid\:\s\'[0-9a-f\.]+/);
            if (result && result[0] && result[0].length > 7) {
              _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _translateSid, result[0].substring(6));
              _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _SIDNotFound, false);
            } else {
              _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _SIDNotFound, true);
            }
            resolve();
          };
          http.onerror = http.onabort = http.ontimeout = e => {
            console.error(e);
            resolve();
          };
        } else {
          resolve();
        }
      }));
      _classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _findPromise).finally(() => {
        _classStaticPrivateFieldSpecSet(YandexHelper, YandexHelper, _findPromise, null);
      });
      return await _classStaticPrivateFieldSpecGet(YandexHelper, YandexHelper, _findPromise);
    }
  }
  /** @type {number} */
  var _lastRequestSidTime = {
    writable: true,
    value: null
  };
  /** @type {string} */
  var _translateSid = {
    writable: true,
    value: null
  };
  /** @type {boolean} */
  var _SIDNotFound = {
    writable: true,
    value: false
  };
  /** @type {Promise<void>} */
  var _findPromise = {
    writable: true,
    value: null
  };
  class BingHelper {
    static get translateAuth() {
      return _classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _translateAuth);
    }

    /**
     * Find the SID (IID and IG) of Bing Translator. The SID value is used in translation requests.
     * @returns {Promise<void>}
     */
    static async findAuth() {
      if (_classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _authPromise)) return await _classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _authPromise);
      _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _authPromise, new Promise(resolve => {
        let updateBingAuth = false;
        if (_classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _lastRequestAuthTime)) {
          const date = new Date();
          if (_classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _translateAuth)) {
            date.setMinutes(date.getMinutes() - 30);
          } else if (_classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _AuthNotFound)) {
            date.setMinutes(date.getMinutes() - 5);
          } else {
            date.setMinutes(date.getMinutes() - 2);
          }
          if (date.getTime() > _classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _lastRequestAuthTime)) {
            updateBingAuth = true;
          }
        } else {
          updateBingAuth = true;
        }
        if (updateBingAuth) {
          _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _lastRequestAuthTime, Date.now());
          const http = new XMLHttpRequest();
          http.open("GET", "https://edge.microsoft.com/translate/auth");
          http.send();
          http.onload = e => {
            if (http.responseText && http.responseText.length > 1) {
              _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _translateAuth, http.responseText);
              _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _AuthNotFound, false);
            } else {
              _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _AuthNotFound, true);
            }
            resolve();
          };
          http.onerror = http.onabort = http.ontimeout = e => {
            console.error(e);
            resolve();
          };
        } else {
          resolve();
        }
      }));
      _classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _authPromise).finally(() => {
        _classStaticPrivateFieldSpecSet(BingHelper, BingHelper, _authPromise, null);
      });
      return await _classStaticPrivateFieldSpecGet(BingHelper, BingHelper, _authPromise);
    }
  }

  /**
   * Returns a string with additional parameters to be concatenated to the request URL.
   * @callback callback_cbParameters
   * @param {string} sourceLanguage
   * @param {string} targetLanguage
   * @param {Array<TranslationInfo>} requests
   * @returns {string}
   */

  /**
   * Takes `sourceArray` and returns a request string to the translation service.
   * @callback callback_cbTransformRequest
   * @param {string[]} sourceArray
   * @returns {string}
   */

  /**
   * @typedef {{text: string, detectedLanguage: string}} Service_Single_Result_Response
   */

  /**
   * Receives the response from the *http request* and returns `Service_Single_Result_Response[]`.
   *
   * Returns a string with the body of a request of type **POST**.
   * @callback callback_cbParseResponse
   * @param {Object} response
   * @returns {Array<Service_Single_Result_Response>}
   */

  /**
   * Takes a string formatted with the translated text and returns a `resultArray`.
   * @callback callback_cbTransformResponse
   * @param {String} response
   * @param {boolean} dontSortResults
   * @returns {string[]} resultArray
   */

  /**
   * Return extra headers for the request.
   * @callback callback_cbGetExtraHeaders
   * @returns {Array<{name: string, value: string}>} headers
   */

  /** @typedef {"complete" | "translating" | "error"} TranslationStatus */
  /**
   * @typedef {Object} TranslationInfo
   * @property {String} originalText
   * @property {String} translatedText
   * @property {String} detectedLanguage
   * @property {TranslationStatus} status
   * @property {Promise<void>} waitTranlate
   */

  /**
   * Base class to create new translation services.
   */
  /** @type {number} */
  var _lastRequestAuthTime = {
    writable: true,
    value: null
  };
  /** @type {string} */
  var _translateAuth = {
    writable: true,
    value: null
  };
  /** @type {boolean} */
  var _AuthNotFound = {
    writable: true,
    value: false
  };
  /** @type {Promise<void>} */
  var _authPromise = {
    writable: true,
    value: null
  };
  class Service {
    /**
     * Initializes the **Service** class with information about the new translation service.
     * @param {string} serviceName
     * @param {string} baseURL
     * @param {"GET" | "POST"} xhrMethod
     * @param {callback_cbTransformRequest} cbTransformRequest Takes `sourceArray` and returns a request string to the translation service.
     * @param {callback_cbParseResponse} cbParseResponse Receives the response from the *http request* and returns `Service_Single_Result_Response[]`.
     * @param {callback_cbTransformResponse} cbTransformResponse Takes a string formatted with the translated text and returns a `resultArray`.
     * @param {callback_cbParameters} cbGetExtraParameters Returns a string with additional parameters to be concatenated to the request URL.
     * @param {callback_cbParameters} cbGetRequestBody Returns a string with the body of a request of type **POST**.
     * @param {callback_cbGetExtraHeaders} cbGetExtraHeaders Return extra headers for the request.
     */
    constructor(serviceName, baseURL, xhrMethod = "GET", cbTransformRequest, cbParseResponse, cbTransformResponse, cbGetExtraParameters = null, cbGetRequestBody = null, cbGetExtraHeaders = null) {
      this.serviceName = serviceName;
      this.baseURL = baseURL;
      this.xhrMethod = xhrMethod;
      this.cbTransformRequest = cbTransformRequest;
      this.cbParseResponse = cbParseResponse;
      this.cbTransformResponse = cbTransformResponse;
      this.cbGetExtraParameters = cbGetExtraParameters;
      this.cbGetRequestBody = cbGetRequestBody;
      this.cbGetExtraHeaders = cbGetExtraHeaders;

      /**
       * @type {Map<string, TranslationInfo>}
       *
       * It works as an in-memory translation cache.
       * Ensures that two identical requests share the same `XMLHttpRequest`.
       * */
      this.translationsInProgress = new Map();
    }

    /**
     * Removes all translations with `status` **error** and are in `translationsInProgress`.
     *
     * Sometimes there is a device translation error due to internet connection problems.
     * Clearing translationsInProgress ensures that the translation will be retried.
     */
    removeTranslationsWithError() {
      this.translationsInProgress.forEach((transInfo, key) => {
        if (transInfo.status === "error") {
          this.translationsInProgress.delete(key);
        }
      });
    }

    /**
     * Receives the `sourceArray2d` parameter and prepares the requests.
     * Calls `cbTransformRequest` for each `sourceArray` of `sourceArray2d`.
     * The `currentTranslationsInProgress` array will be the **final result** with requests already completed or in progress. And the `requests` array will only contain the new requests that need to be made.
     *
     * Checks if there is already an identical request in progress or if it is already in the translation cache.
     * If it doesn't exist, add it to `requests` to make a new *http request*.
     *
     * Requests longer than **800 characters** will be split into new requests.
     * @param {string} sourceLanguage
     * @param {string} targetLanguage
     * @param {Array<string[]>} sourceArray2d
     * @returns {Promise<[Array<TranslationInfo[]>, TranslationInfo[]]>} `requests`, `currentTranslationsInProgress`
     */
    async getRequests(sourceLanguage, targetLanguage, sourceArray2d) {
      /** @type {Array<TranslationInfo[]>} */
      const requests = [];
      /** @type {TranslationInfo[]} */
      const currentTranslationsInProgress = [];
      let currentRequest = [];
      let currentSize = 0;
      for (const sourceArray of sourceArray2d) {
        const requestString = this.fixString(this.cbTransformRequest(sourceArray));
        const requestHash = [sourceLanguage, targetLanguage, requestString].join(", ");
        const progressInfo = this.translationsInProgress.get(requestHash);
        if (progressInfo) {
          currentTranslationsInProgress.push(progressInfo);
        } else {
          /** @type {TranslationStatus} */
          let status = "translating";
          /** @type {() => void} */
          let promise_resolve = null;

          /** @type {TranslationInfo} */
          const progressInfo = {
            originalText: requestString,
            translatedText: null,
            detectedLanguage: null,
            get status() {
              return status;
            },
            set status(_status) {
              status = _status;
              promise_resolve();
            },
            waitTranlate: new Promise(resolve => promise_resolve = resolve)
          };
          currentTranslationsInProgress.push(progressInfo);
          this.translationsInProgress.set(requestHash, progressInfo);

          //cast
          const cacheEntry = await translationCache.get(this.serviceName, sourceLanguage, targetLanguage, requestString);
          if (cacheEntry) {
            progressInfo.translatedText = cacheEntry.translatedText;
            progressInfo.detectedLanguage = cacheEntry.detectedLanguage;
            progressInfo.status = "complete";
            //this.translationsInProgress.delete([sourceLanguage, targetLanguage, requestString])
          } else {
            currentRequest.push(progressInfo);
            currentSize += progressInfo.originalText.length;
            if (currentSize > 800) {
              requests.push(currentRequest);
              currentSize = 0;
              currentRequest = [];
            }
          }
        }
      }
      if (currentRequest.length > 0) {
        requests.push(currentRequest);
        currentRequest = [];
        currentSize = 0;
      }
      return [requests, currentTranslationsInProgress];
    }

    /**
     * Makes a request using the *XMLHttpRequest* API. Returns a promise that will be resolved with the result of the request. If the request fails, the promise will be rejected.
     * @param {string} sourceLanguage
     * @param {string} targetLanguage
     * @param {Array<TranslationInfo>} requests
     * @returns {Promise<*>}
     */
    async makeRequest(sourceLanguage, targetLanguage, requests) {
      return await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(this.xhrMethod, this.baseURL + (this.cbGetExtraParameters ? this.cbGetExtraParameters(sourceLanguage, targetLanguage, requests) : ""));
        if (this.cbGetExtraHeaders) {
          const headers = this.cbGetExtraHeaders();
          headers.forEach(header => {
            xhr.setRequestHeader(header.name, header.value);
          });
        }
        xhr.responseType = "json";
        xhr.onload = event => {
          resolve(xhr.response);
        };
        xhr.onerror = xhr.onabort = xhr.ontimeout = event => {
          console.error(event);
          reject();
        };
        xhr.send(this.cbGetExtraParameters ? this.cbGetRequestBody(sourceLanguage, targetLanguage, requests) : undefined);
      });
    }

    /**
     * Translates the `sourceArray2d`.
     *
     * If `dontSaveInPersistentCache` is **true** then the translation result will not be saved in the on-disk translation cache, only in the in-memory cache.
     *
     * The `dontSortResults` parameter is only valid when using the ***google*** translation service, if its value is **true** then the translation result will not be sorted.
     * @param {string} sourceLanguage
     * @param {string} targetLanguage
     * @param {Array<string[]>} sourceArray2d
     * @param {boolean} dontSaveInPersistentCache
     * @param {boolean} dontSortResults
     * @returns {Promise<string[][]>}
     */
    async translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache = false, dontSortResults = false) {
      const [requests, currentTranslationsInProgress] = await this.getRequests(sourceLanguage, targetLanguage, sourceArray2d);
      /** @type {Promise<void>[]} */
      const promises = [];
      for (const request of requests) {
        promises.push(this.makeRequest(sourceLanguage, targetLanguage, request).then(response => {
          const results = this.cbParseResponse(response);
          for (const idx in request) {
            const result = results[idx];
            this.cbTransformResponse(result.text, dontSortResults); // apenas para gerar error
            const transInfo = request[idx];
            transInfo.detectedLanguage = result.detectedLanguage || "und";
            transInfo.translatedText = result.text;
            transInfo.status = "complete";
            if (dontSaveInPersistentCache === false && transInfo.translatedText) {
              translationCache.set(this.serviceName, sourceLanguage, targetLanguage, transInfo.originalText, transInfo.translatedText, transInfo.detectedLanguage);
            }
          }
        }).catch(e => {
          console.error(e);
          for (const transInfo of request) {
            transInfo.status = "error";
            //this.translationsInProgress.delete([sourceLanguage, targetLanguage, transInfo.originalText])
          }
        }));
      }

      await Promise.all(currentTranslationsInProgress.map(transInfo => transInfo.waitTranlate));
      return currentTranslationsInProgress.map(transInfo => this.cbTransformResponse(transInfo.translatedText, dontSortResults));
    }

    /**
     * https://github.com/FilipePS/Traduzir-paginas-web/issues/484
     * @param {string} str
     * @returns {string} fixedStr
     */
    fixString(str) {
      return str.replace(/\u200b/g, " ");
    }
  }
  const googleService = new class extends Service {
    constructor() {
      super("google", "https://translate.googleapis.com/translate_a/t?anno=3&client=te&v=1.0&format=html", "POST", function cbTransformRequest(sourceArray) {
        sourceArray = sourceArray.map(text => Utils.escapeHTML(text));
        if (sourceArray.length > 1) {
          sourceArray = sourceArray.map((text, index) => `<a i=${index}>${text}</a>`);
        }
        // the <pre> tag is to preserve the text formating
        return `<pre>${sourceArray.join("")}</pre>`;
      }, function cbParseResponse(response) {
        /** @type {[Service_Single_Result_Response]} */
        let responseJson;
        if (typeof response === "string") {
          responseJson = [{
            text: response,
            detectedLanguage: null
          }];
        } else if (typeof response[0] === "string") {
          responseJson = response.map( /** @returns {Service_Single_Result_Response} */( /** @type {string} */value) => ({
            text: value,
            detectedLanguage: null
          }));
        } else {
          responseJson = response.map( /** @returns {Service_Single_Result_Response} */( /** @type {[string, string]} */value) => ({
            text: value[0],
            detectedLanguage: value[1]
          }));
        }
        return responseJson;
      }, function cbTransformResponse(result, dontSortResults) {
        // remove the <pre> tag from the response
        if (result.indexOf("<pre") !== -1) {
          result = result.replace("</pre>", "");
          const index = result.indexOf(">");
          result = result.slice(index + 1);
        }

        /** @type {string[]} */
        const sentences = []; // each translated sentence is inside of <b> tag

        // The main objective is to remove the original text of each sentense that is inside the <i> tags.
        // Keeping only the <a> tags
        let idx = 0;
        while (true) {
          // each translated sentence is inside of <b> tag
          const sentenceStartIndex = result.indexOf("<b>", idx);
          if (sentenceStartIndex === -1) break;

          // the <i> tag is the original text in each sentence
          const sentenceFinalIndex = result.indexOf("<i>", sentenceStartIndex);
          if (sentenceFinalIndex === -1) {
            sentences.push(result.slice(sentenceStartIndex + 3));
            break;
          } else {
            sentences.push(result.slice(sentenceStartIndex + 3, sentenceFinalIndex));
          }
          idx = sentenceFinalIndex;
        }

        // maybe the response don't have any sentence (does not have <i> and <b> tags), is this case just use de result
        result = sentences.length > 0 ? sentences.join(" ") : result;
        // Remove the remaining </b> tags (usually the last)
        result = result.replace(/\<\/b\>/g, "");
        // Capture each <a i={number}> and put it in an array, the </a> will be ignored
        // maybe the same index appears several times
        // maybe some text will be outside of <a i={number}> (Usually text before the first <a> tag, and some whitespace between the <a> tags),
        // in this case, The outside text will be placed inside the <a i={number}> closer
        // https://github.com/FilipePS/Traduzir-paginas-web/issues/449
        // TODO lidar com tags dentro de tags e tags vazias
        // https://de.wikipedia.org/wiki/Wikipedia:Hauptseite
        // "{\"originalText\":\"<pre><a i=0>\\nFür den </a><a i=1>37. Schreib­wettbewerb</a><a i=2> und den </a><a i=3>18. Miniaturwettbewerb</a><a i=4> können ab sofort Artikel nominiert werden.</a></pre>\",\"translatedText\":\"<pre><a i=0>\\n</a>Artigos já podem ser indicados <a i=0>para o</a> <a i=1>37º Concurso de Redação <a i=2>e</a></a> <a i=3><a i=4>18º</a> Concurso de Miniaturas</a> .</pre>\",\"detectedLanguage\":\"de\",\"status\":\"complete\",\"waitTranlate\":{}}"
        let resultArray = [];
        let lastEndPos = 0;
        for (const r of result.matchAll(/(\<a\si\=[0-9]+\>)([^\<\>]*(?=\<\/a\>))*/g)) {
          const fullText = r[0];
          const fullLength = r[0].length;
          const pos = r.index;
          // if it is bigger then it has text outside the tags
          if (pos > lastEndPos) {
            const aTag = r[1];
            const insideText = r[2] || "";
            const outsideText = result.slice(lastEndPos, pos).replace(/\<\/a\>/g, "");
            resultArray.push(aTag + outsideText + insideText);
          } else {
            resultArray.push(fullText);
          }
          lastEndPos = pos + fullLength;
        }
        // captures the final text outside the <a> tag
        {
          const lastOutsideText = result.slice(lastEndPos).replace(/\<\/a\>/g, "");
          if (resultArray.length > 0) {
            resultArray[resultArray.length - 1] += lastOutsideText;
          }
        }
        // this is the old method, don't capture text outside of <a> tags
        // let resultArray = result.match(
        //   /\<a\si\=[0-9]+\>[^\<\>]*(?=\<\/a\>)/g
        // );

        if (dontSortResults) {
          // Should not sort the <a i={number}> of Google Translate result
          // Instead of it, join the texts without sorting
          // https://github.com/FilipePS/Traduzir-paginas-web/issues/163

          if (resultArray && resultArray.length > 0) {
            // get the text inside of <a i={number}>
            // the indexes is not needed in this case
            resultArray = resultArray.map(value => {
              const resultStartAtIndex = value.indexOf(">");
              return value.slice(resultStartAtIndex + 1);
            });
          } else {
            // maybe the response don't have any <a i={number}>
            resultArray = [result];
          }

          // unescapeHTML
          resultArray = resultArray.map(value => Utils.unescapeHTML(value));
          return resultArray;
        } else {
          // Sort Google translate results to keep the links with the correct name
          // Note: the links may also disappear; http://web.archive.org/web/20220919162911/https://de.wikipedia.org/wiki/Wikipedia:Hauptseite
          // each inline tag has a index starting with 0 <a i={number}>
          let indexes;
          if (resultArray && resultArray.length > 0) {
            // get the indexed of <a i={number}>
            indexes = resultArray.map(value => parseInt(value.match(/[0-9]+(?=\>)/g)[0])).filter(value => !isNaN(value));
            // get the text inside of <a i={number}>
            resultArray = resultArray.map(value => {
              const resultStartAtIndex = value.indexOf(">");
              return value.slice(resultStartAtIndex + 1);
            });
          } else {
            // maybe the response don't have any <a i={number}>
            resultArray = [result];
            indexes = [0];
          }

          // unescapeHTML
          resultArray = resultArray.map(value => Utils.unescapeHTML(value));

          /** @type {string[]} */
          const finalResulArray = [];
          // sorte de results and put in finalResulArray
          for (const j in indexes) {
            if (finalResulArray[indexes[j]]) {
              finalResulArray[indexes[j]] += " " + resultArray[j];
            } else {
              finalResulArray[indexes[j]] = resultArray[j];
            }
          }
          return finalResulArray;
        }
      }, function cbGetExtraParameters(sourceLanguage, targetLanguage, requests) {
        return `&sl=${sourceLanguage}&tl=${targetLanguage}&tk=${GoogleHelper.calcHash(requests.map(info => info.originalText).join(""))}`;
      }, function cbGetRequestBody(sourceLanguage, targetLanguage, requests) {
        return requests.map(info => `&q=${encodeURIComponent(info.originalText)}`).join("");
      }, function cbGetExtraHeaders() {
        return [{
          name: "Content-Type",
          value: "application/x-www-form-urlencoded"
        }];
      });
    }
  }();
  const yandexService = new class extends Service {
    constructor() {
      super("yandex", "https://translate.yandex.net/api/v1/tr.json/translate?srv=tr-url-widget", "GET", function cbTransformRequest(sourceArray) {
        return sourceArray.map(value => Utils.escapeHTML(value)).join("<wbr>");
      }, function cbParseResponse(response) {
        const lang = response.lang;
        const detectedLanguage = lang ? lang.split("-")[0] : null;
        return response.text.map( /** @return {Service_Single_Result_Response} */( /** @type {string} */text) => ({
          text,
          detectedLanguage
        }));
      }, function cbTransformResponse(result, dontSortResults) {
        return result.split("<wbr>").map(value => Utils.unescapeHTML(value));
      }, function cbGetExtraParameters(sourceLanguage, targetLanguage, requests) {
        return `&id=${YandexHelper.translateSid}-0-0&format=html&lang=${sourceLanguage === "auto" ? "" : sourceLanguage + "-"}${targetLanguage}${requests.map(info => `&text=${encodeURIComponent(info.originalText)}`).join("")}`;
      }, function cbGetRequestBody(sourceLanguage, targetLanguage, requests) {
        return undefined;
      }, function cbGetExtraHeaders() {
        return [{
          name: "Content-Type",
          value: "application/x-www-form-urlencoded"
        }];
      });
    }

    /**
     * @param {boolean} dontSortResults This parameter is not needed in this translation service
     */
    async translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults = false) {
      await YandexHelper.findSID();
      if (!YandexHelper.translateSid) return;
      if (sourceLanguage.startsWith("zh")) sourceLanguage = "zh";
      if (targetLanguage.startsWith("zh")) targetLanguage = "zh";
      return await super.translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults);
    }
  }();
  const bingService = new class extends Service {
    constructor() {
      super("bing", "https://api-edge.cognitive.microsofttranslator.com/translate?api-version=3.0&includeSentenceLength=true", "POST", function cbTransformRequest(sourceArray) {
        let id = 10;
        return sourceArray.map(value => {
          const r = `<b${id}>${Utils.escapeHTML(value)}</b${id}>`;
          id++;
          return r;
        }).join("");
      }, function cbParseResponse(response) {
        return response.map( /** @return {Service_Single_Result_Response} */
        ( /** @type {object} */r) => {
          var _r$detectedLanguage;
          return {
            text: r.translations[0].text,
            detectedLanguage: (_r$detectedLanguage = r.detectedLanguage) === null || _r$detectedLanguage === void 0 ? void 0 : _r$detectedLanguage.language
          };
        });
      }, function cbTransformResponse(result, dontSortResults) {
        const resultArray = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(result, "text/html");
        let currText = "";
        doc.body.childNodes.forEach(node => {
          if (dontSortResults) {
            if (node.nodeName == "#text") {
              currText += node.textContent;
            } else {
              resultArray.push(currText + node.textContent);
              currText = "";
            }
          } else {
            if (node.nodeName == "#text") {
              currText += node.textContent;
            } else {
              const id = parseInt(node.nodeName.slice(1)) - 10;
              resultArray[id] = currText + node.textContent;
              currText = "";
            }
          }
        });
        return resultArray;
      }, function cbGetExtraParameters(sourceLanguage, targetLanguage, requests) {
        return `${sourceLanguage !== "auto-detect" ? "&from=" + sourceLanguage : ""}&to=${targetLanguage}`;
      }, function cbGetRequestBody(sourceLanguage, targetLanguage, requests) {
        return JSON.stringify(requests.map(info => ({
          text: info.originalText
        })));
      }, function cbGetExtraHeaders() {
        return [{
          name: "Content-Type",
          value: "application/json"
        }, {
          name: "authorization",
          value: "Bearer " + BingHelper.translateAuth
        }];
      });
    }

    /**
     * @param {string[][]} sourceArray2d - Only the string `sourceArray2d[0][0]` will be translated.
     * @param {boolean} dontSortResults - This parameter is not needed in this translation service
     */
    async translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults = false) {
      /** @type {{search: string, replace: string}[]} */
      const replacements = [{
        search: "auto",
        replace: "auto-detect"
      }, {
        search: "zh-CN",
        replace: "zh-Hans"
      }, {
        search: "zh-TW",
        replace: "zh-Hant"
      }, {
        search: "tl",
        replace: "fil"
      }, {
        search: "hmn",
        replace: "mww"
      }, {
        search: "ckb",
        replace: "kmr"
      }, {
        search: "mn",
        replace: "mn-Cyrl"
      }, {
        search: "no",
        replace: "nb"
      }, {
        search: "sr",
        replace: "sr-Cyrl"
      }];
      replacements.forEach(r => {
        if (targetLanguage === r.search) {
          targetLanguage = r.replace;
        }
        if (sourceLanguage === r.search) {
          sourceLanguage = r.replace;
        }
      });
      await BingHelper.findAuth();
      if (!BingHelper.translateAuth) return;
      return await super.translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults);
    }
  }();
  const deeplService = new class {
    constructor() {
      this.DeepLTab = null;
    }
    /**
     *
     * @param {string} sourceLanguage - This parameter is not used
     * @param {*} targetLanguage
     * @param {*} sourceArray2d - Only the string `sourceArray2d[0][0]` will be translated.
     * @param {*} dontSaveInPersistentCache - This parameter is not used
     * @param {*} dontSortResults - This parameter is not used
     * @returns
     */
    async translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults = false) {
      return await new Promise(resolve => {
        const waitFirstTranslationResult = () => {
          const listener = (request, sender, sendResponse) => {
            if (request.action === "DeepL_firstTranslationResult") {
              resolve([[request.result]]);
              chrome.runtime.onMessage.removeListener(listener);
            }
          };
          chrome.runtime.onMessage.addListener(listener);
          setTimeout(() => {
            chrome.runtime.onMessage.removeListener(listener);
            resolve([[""]]);
          }, 8000);
        };
        if (this.DeepLTab) {
          chrome.tabs.get(this.DeepLTab.id, tab => {
            checkedLastError();
            if (tab) {
              //chrome.tabs.update(tab.id, {active: true})
              chrome.tabs.sendMessage(tab.id, {
                action: "translateTextWithDeepL",
                text: sourceArray2d[0][0],
                targetLanguage
              }, {
                frameId: 0
              }, response => {
                checkedLastError();
                resolve([[response]]);
              });
            } else {
              chrome.tabs.create({
                url: `https://www.deepl.com/#!${targetLanguage}!#${encodeURIComponent(sourceArray2d[0][0])}`
              }, tab => {
                this.DeepLTab = tab;
                waitFirstTranslationResult();
              });
              // resolve([[""]])
            }
          });
        } else {
          chrome.tabs.create({
            url: `https://www.deepl.com/#!${targetLanguage}!#${encodeURIComponent(sourceArray2d[0][0])}`
          }, tab => {
            this.DeepLTab = tab;
            waitFirstTranslationResult();
          });
          // resolve([[""]])
        }
      });
    }
  }();

  /** @type {Map<string, Service>} */
  const serviceList = new Map();
  serviceList.set("google", googleService);
  serviceList.set("yandex", yandexService);
  serviceList.set("bing", bingService);
  serviceList.set("deepl", /** @type {Service} */ /** @type {?} */deeplService);
  translationService.translateHTML = async (serviceName, sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache = false, dontSortResults = false) => {
    serviceName = twpLang.getAlternativeService(targetLanguage, serviceName, true);
    const service = serviceList.get(serviceName) || serviceList.get("google");
    return await service.translate(sourceLanguage, targetLanguage, sourceArray2d, dontSaveInPersistentCache, dontSortResults);
  };
  translationService.translateText = async (serviceName, sourceLanguage, targetLanguage, sourceArray, dontSaveInPersistentCache = false) => {
    serviceName = twpLang.getAlternativeService(targetLanguage, serviceName, false);
    const service = serviceList.get(serviceName) || serviceList.get("google");
    return (await service.translate(sourceLanguage, targetLanguage, [sourceArray], dontSaveInPersistentCache))[0];
  };
  translationService.translateSingleText = async (serviceName, sourceLanguage, targetLanguage, originalText, dontSaveInPersistentCache = false) => {
    serviceName = twpLang.getAlternativeService(targetLanguage, serviceName, false);
    const service = serviceList.get(serviceName) || serviceList.get("google");
    return (await service.translate(sourceLanguage, targetLanguage, [[originalText]], dontSaveInPersistentCache))[0][0];
  };
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // If the translation request came from an incognito window, the translation should not be cached on disk.
    let dontSaveInPersistentCache = true;
    if (twpConfig.get("enableDiskCache") !== "yes") {
      dontSaveInPersistentCache = true;
    } else {
      dontSaveInPersistentCache = sender.tab ? sender.tab.incognito : false;
    }
    if (request.action === "translateHTML") {
      translationService.translateHTML(request.translationService, "auto", request.targetLanguage, request.sourceArray2d, dontSaveInPersistentCache, request.dontSortResults).then(results => sendResponse(results)).catch(e => {
        sendResponse();
        console.error(e);
      });
      return true;
    } else if (request.action === "translateText") {
      translationService.translateText(request.translationService, "auto", request.targetLanguage, request.sourceArray, dontSaveInPersistentCache).then(results => sendResponse(results)).catch(e => {
        sendResponse();
        console.error(e);
      });
      return true;
    } else if (request.action === "translateSingleText") {
      translationService.translateSingleText(request.translationService, "auto", request.targetLanguage, request.source, dontSaveInPersistentCache).then(results => sendResponse(results)).catch(e => {
        sendResponse();
        console.error(e);
      });
      return true;
    } else if (request.action === "removeTranslationsWithError") {
      serviceList.forEach(service => {
        if (service.removeTranslationsWithError) {
          service.removeTranslationsWithError();
        }
      });
    }
  });
  return translationService;
}();
//# sourceMappingURL=https://raw.githubusercontent.com/FilipePS/TWP---Source-Maps/main/maps/9.7.2/translationService.js.map
