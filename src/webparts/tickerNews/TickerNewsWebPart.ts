import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import TickerNews from './components/TickerNews';
import { ITickerNewsProps } from './components/ITickerNewsProps';

export interface ITickerNewsWebPartProps {
  showArchive: boolean;
}

export default class TickerNewsWebPart extends BaseClientSideWebPart<ITickerNewsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITickerNewsProps> = React.createElement(
      TickerNews,
      {
        context: this.context,
        showArchive: this.properties.showArchive
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "TickerNews settings" },
          groups: [
            {
              groupFields: [
                PropertyPaneToggle('showArchive', {
                  label: "Show old tickers (accordion)",
                  onText: 'Show',
                  offText: 'Hide'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}