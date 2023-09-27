import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CurrencyWallWebPartStrings';
import CurrencyWall from './components/CurrencyWall';
import { CurrencySevice } from './CurrencyService';
import { ICurrencyWallProps} from './components/ICurrencyWallProps';

export interface ICurrencyWallWebPartProps {
  description: string;
}

export default class CurrencyWallWebPart extends BaseClientSideWebPart<ICurrencyWallWebPartProps> {
 
  private _currencyService: CurrencySevice;

  protected async onInit(): Promise<void> {
    await super.onInit();

  // Инициализируйте ваш сервис здесь
    this._currencyService = new CurrencySevice();
  }

  public async render(): Promise<void> {
    try {
      console.log(this.description)
      const currency = await this._currencyService.getResource(); // Дождитесь разрешения обещания
      const element: React.ReactElement<ICurrencyWallProps & ICurrencyWallWebPartProps> = React.createElement(
        CurrencyWall,
        {
          currency: currency,
          description: this.properties.description
      
        }
      );
  
      ReactDom.render(element, this.domElement);
    } catch (error) {
      console.error(error);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
