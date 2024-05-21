//import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloWorld.module.scss';
import * as strings from 'helloWorldStrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
private _isDarkTheme: boolean = false;
private _environmentMessage: string = '';
  public render(): void {
    
    this.domElement.innerHTML = `
<section class="${styles.helloWorld}">
  <div class="${styles.welcome}">
    <img alt="" src="${this._isDarkTheme ? require('./assets/welcome-dark.png') : require('./assets/welcome-light.png')}" class="${styles.welcomeImage}" />
    <h2>Well done, ${escape(this.context.pageContext.user.displayName)}!</h2>
    <div>${this._environmentMessage}</div>
  </div>
  <div>
    <h3>Welcome to SharePoint Framework!</h3>
    <div>Web part description: <strong>${escape(this.properties.description)}</strong></div>
    <div>Web part test: <strong>${escape(this.properties.test)}</strong></div>
    <div>Loading from: <strong>${escape(this.context.pageContext.web.title)}</strong></div>
  </div>
</section>`;
    // this.domElement.innerHTML = `
    //   <div class="${styles.helloWorld}">
    //     <div class="${styles.container}">
    //       <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
    //         <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
    //           <span class="ms-font-xl ms-fontColor-white">Welcome to SharePoint!</span>
    //           <p class="ms-font-l ms-fontColor-white">Customize SharePoint experiences using Web Parts.</p>
    //           <p class="ms-font-l ms-fontColor-white">${escape(this.properties.description)}</p>
    //           <a href="https://aka.ms/spfx" class="${styles.button}">
    //             <span class="${styles.label}">Learn more</span>
    //           </a>
    //         </div>
    //       </div>
    //     </div>
    //   </div>`;
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

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
                  label: 'Description'
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line Text Field',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One' },
                    { key: '2', text: 'Two' },
                    { key: '3', text: 'Three' },
                    { key: '4', text: 'Four' }
                  ]
                }),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
