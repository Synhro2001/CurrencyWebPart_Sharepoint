import * as React from 'react';
import { ICurrency } from '../ICurrencyWallProps';

import displayStyle from './CurrencyDisplay.module.scss';

interface CurrencyDisplayProps {
    // eslint-disable-next-line @rushstack/no-new-null
    templateUpdate: ICurrency | null;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ templateUpdate }) =>  {
  return (
    <div className={displayStyle.currencyItems}>
    {Array.isArray(templateUpdate) && templateUpdate.length > 0 && (
      <>
      <p>Ticker: {templateUpdate[0].ticker}</p>
      <p>Bid: {templateUpdate[0].bid}</p>
      <p>Ask: {templateUpdate[0].ask}</p>
      <p>Open: {templateUpdate[0].open}</p>
      <p>Low: {templateUpdate[0].low}</p>
      <p>High: {templateUpdate[0].high}</p>
      <p>Changes: {templateUpdate[0].changes}</p>    
      <p>Date: {templateUpdate[0].date}</p>
      </>
    )}
  </div>
  )
}

export default CurrencyDisplay
