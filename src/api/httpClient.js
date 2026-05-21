/**
 * @function convertURL
 * @param {String} url - The server URL.
 * @param {Object} params - Query parameters as key-value pairs.
 * @returns {String} - URL String with Query parameters.
 * @throws Will throw an error with the URL is empty.
 */
const convertURL = (url, params) => {
  if (!url) throw new Error("URL is Empty");
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return url + query;
};

const JSON_HEADERS = { "Content-Type": "application/json" };

/**
 * fetch 공통 래퍼. method/body 직렬화 및 응답 파싱을 일원화한다.
 *
 * @param {String} method - HTTP method ("GET" | "POST" | "PUT" | "PATCH" | "DELETE")
 * @param {String} url - 요청 URL
 * @param {Object} [body] - 요청 body. FormData면 그대로, 객체면 JSON 직렬화.
 * @returns {Promise<Object>} 응답 JSON
 * @throws 응답 status가 ok가 아니면 status 코드를 메시지로 갖는 Error.
 */
const request = async (method, url, body) => {
  const init = { method };

  if (body !== undefined) {
    const isFormData = body instanceof FormData;
    init.headers = isFormData ? {} : JSON_HEADERS;
    init.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(url, init);
  if (!response.ok) throw new Error(response.status);
  return await response.json();
};

/**
 * HTTP requests
 *
 * @namespace httpClient
 */
const httpClient = {
  /**
   * HTTP GET request
   * @param {String} url
   * @param {Object} [params] - Query parameters
   * @returns {Promise<Object>}
   */
  get: (url, params) => request("GET", convertURL(url, params)),

  /**
   * HTTP POST request
   * @param {String} url
   * @param {Object|FormData} body
   * @returns {Promise<Object>}
   */
  post: (url, body) => request("POST", url, body),

  /**
   * HTTP PUT request
   * @param {String} url
   * @param {Object} body
   * @returns {Promise<Object>}
   */
  put: (url, body) => request("PUT", url, body),

  /**
   * HTTP PATCH request
   * @param {String} url
   * @param {Object} body
   * @returns {Promise<Object>}
   */
  patch: (url, body) => request("PATCH", url, body),

  /**
   * HTTP DELETE request
   * @param {String} url
   * @returns {Promise<Object>}
   */
  delete: (url) => request("DELETE", url),
};

export default httpClient;
