import axios from 'axios';
import { ICurrenctCombined } from './components/ICurrencyWallProps';

export class CurrencySevice {
    private _apiBaseUrl = 'https://financialmodelingprep.com/api/v3/fx/';
    private _apiKey = 'apikey=23f4d6e65efabceedd0c1488321d538e';

    public async getResource(): Promise<[]> {
        try {
            const response = await axios.get(`${this._apiBaseUrl}?${this._apiKey}`);
            const data = response.data; // data - это объект JavaScript, содержащий данные из JSON
            return data; // Вернуть конкретное свойство из объекта JSON
        } catch (error) {
            throw new Error('Error fetching Bitcoin price: ' + error.message);
        }
    }

    public async getCurrency(currency: string): Promise<ICurrenctCombined> {
        try {
            const currencyResponse = await axios.get(`${this._apiBaseUrl}${currency}?${this._apiKey}`);
            console.log(currencyResponse.data)
      
            return currencyResponse.data;

        } catch (error) {
            throw new Error('Error fetching Bitcoin price: ' + error.message);
        }
    }

}