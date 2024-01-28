import axios from 'axios';

export class APIClient {
  private static instance: APIClient;
  private static readonly baseURL = 'https://dummyjson.com';

  /**
   * Private constructor to prevent instantiation outside of the class
   * Sets the base URL for the API
   * Sets up interceptors for logging requests and responses
   */
  private constructor() {
    axios.defaults.baseURL = APIClient.baseURL;

    axios.interceptors.request.use((config) => {
      console.log('Request sent', config);
      return config;
    });

    axios.interceptors.response.use((response) => {
      console.log('Response received', response);
      return response;
    });
  }

  /**
   * Returns the singleton instance of the APIClient
   *
   * @returns APIClient instance
   */
  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }

    return APIClient.instance;
  }

  /**
   * GET request to the API with the given Endpoint appended to the base URL
   *
   * @param url string to be appended to the base URL
   * @returns Promise<T> where T is the type of the response data
   */
  public async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url, {
      headers: {
        'Content-Type': 'application/json',
      },  
    });
    return response.data;
  }

  /**
   * POST request to the API with the given Endpoint appended to the base URL
   * and the given data sent in the request body as JSON
   *
   * @param url string to be appended to the base URL
   * @param data data of type D to be sent in the request body
   * @returns Promise<T> where T is the type of the response data
   */
  public async post<T, D>(url: string, data: D): Promise<T> {
    const response = await axios.post<T>(url, data);
    return response.data;
  }

  /**
   * PUT request to the API with the given Endpoint appended to the base URL
   * and the given data sent in the request body as JSON
   *
   * @param url string to be appended to the base URL
   * @param data data of type D to be sent in the request body
   * @returns Promise<T> where T is the type of the response data
   */
  public async put<T, D>(url: string, data: D): Promise<T> {
    const response = await axios.put<T>(url, data);
    return response.data;
  }

  /**
   * DELETE request to the API with the given Endpoint appended to the base URL
   *
   * @param url string to be appended to the base URL
   * @returns Promise<T> where T is the type of the response data
   */
  public async delete<T>(url: string): Promise<T> {
    const response = await axios.delete<T>(url);
    return response.data;
  }

  /**
   * PATCH request to the API with the given Endpoint appended to the base URL
   * and the given data sent in the request body as JSON
   *
   * @param url string to be appended to the base URL
   * @param data data of type D to be sent in the request body
   * @returns Promise<T> where T is the type of the response data
   */
  public async patch<T, D>(url: string, data: D): Promise<T> {
    const response = await axios.patch<T>(url, data);
    return response.data;
  }
}
