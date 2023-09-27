/* eslint-disable no-void */
import * as React from 'react';
import { useState } from 'react';
import { ICurrencyWallProps, ICurrency } from './ICurrencyWallProps';
import CurrencyDisplay from './CurrencyDisplay/CurrencyDisplay';

import styles from './CurrencyWall.module.scss';

import { CurrencySevice } from '../CurrencyService';

const regex = new RegExp(/^[a-zA-Z]{3,6}\/?[a-zA-Z]{3}$/gm);

const CurrencyWall: React.FC<ICurrencyWallProps & ICurrency> = (props) => {

  const currencyService = new CurrencySevice()

  const {
    currency,
    description
  } = props
  
  // const [value, setValue] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [dropDown, setDropDown] = useState<boolean>(false)
  const [templateUpdate, setTemplateUpdate] = useState<ICurrency | null>(null);

  const [showCurrencyDisplay, setShowCurrencyDisplay] = useState<boolean>(false); // Добавляем состояние для контроля видимости CurrencyDisplay

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value.toUpperCase())
    if(!dropDown) {
      setDropDown(true)
    }
  } 

  const onClickItem = (item: string): void => {
    setInputValue(item.toUpperCase());
    setDropDown(false);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onUpdateData = async () => {
    if (regex.test(inputValue)) {
      try {
        const result = await currencyService.getCurrency(inputValue.toLowerCase().replace('/', ''));
        console.log(result)
        setTemplateUpdate(result);
        setShowCurrencyDisplay(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const currencyTicker = currency?.filter(e => e.ticker.indexOf(inputValue) !== -1)

  return (
    <section className={styles.currencyWall}>
      <h2> {description}</h2>
      <input
        type='text'
        value={inputValue}
        className={styles.currencyInput}
        placeholder='Search currency (EUR/USD)'
        onChange={onInputValueChange}
        onFocus={() => {setDropDown(true)}}
      />
      <button className={styles.currencyButton} onClick={onUpdateData}>
        Search 
      </button>
      <ul className={styles.currencyDropDown}>
        {
          dropDown && inputValue ? 
          currencyTicker.map((res, key) => {
            return (
              <li 
                key={key}
                className={styles.currencyDropDownItem}
                onClick={() => onClickItem(res.ticker)}
              >
              {res.ticker}
              </li>
            )
          })
          : null
        }
      </ul>
      {showCurrencyDisplay && <CurrencyDisplay templateUpdate={templateUpdate} />}
    </section>
  );
};

export default CurrencyWall;



