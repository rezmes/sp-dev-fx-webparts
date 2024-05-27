// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import {
//   BaseClientSideWebPart,
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField
// } from '@microsoft/sp-webpart-base';

// import * as strings from 'ListItemsWebPartStrings';
// import ListItems from './components/ListItems';
// import { IListItemsProps } from './components/IListItemsProps';

// export interface IListItemsWebPartProps {
//   description: string;
//   listName: string;
// }

// export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {
//   private _DarkTheme: boolean = false; // Set an appropriate default value
//   private _environmentMessage: string = ''; // Set an appropriate default value
  
  
//   public render(): void {
    
//     const element: React.ReactElement<IListItemsProps> = React.createElement(
//       ListItems,
//       {
        
//         listName: this.properties.listName,
//         description: this.properties.description,
//         isDarkTheme: this._DarkTheme,
//         environmentMessage: this._environmentMessage,
//         hasTeamsContext: !!teamsContext,
//         userDisplayName: this.context.pageContext.user.displayName
//       }
//     );

//     ReactDom.render(element, this.domElement);
//   }

//   protected onInit(): Promise<void> {
//     return this._getEnvironmentMessage().then(message => {
//       this._environmentMessage = message;
//       return super.onInit();
//     });
//   }

//   private _getEnvironmentMessage(): Promise<string> {
//     if (!!this.context.microsoftTeams) {
//       return Promise.resolve(strings.TeamsEnvironment);
//     }

//     if (window.location.hostname === 'localhost') {
//       return Promise.resolve(strings.LocalSharePointEnvironment);
//     }

//     return Promise.resolve(strings.SharePointEnvironment);
//   }


//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected get dataVersion(): Version {
//     return Version.parse('1.0');
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         {
//           header: {
//             description: strings.PropertyPaneDescription
//           },
//           groups: [
//             {
//               groupName: strings.BasicGroupName,
//               groupFields: [
//                 PropertyPaneTextField('listName', {
//                   label: strings.ListFieldLabel
//                 })
//               ]
//             }
//           ]
//         }
//       ]
//     };
//   }
//   protected onThemeChanged(currentTheme: string | undefined): void {
//     if (currentTheme) {
//       this._isDarkTheme = currentTheme === 'dark';
//       this.render();
//     }
//   } 
// }
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListItemsWebPartStrings';
import ListItems from './components/ListItems';
import { IListItemsProps } from './components/IListItemsProps';

export interface IListItemsWebPartProps {
  description: string;
  listName: string;
}

export default class ListItemsWebPart extends BaseClientSideWebPart<IListItemsWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  // private _hasTeamsContext: boolean = false; // Add this line

  public render(): void {
   // Cast context to any to access microsoftTeams property
   const contextAsAny = this.context as any;
   const teamsContext = contextAsAny.microsoftTeams ? contextAsAny.microsoftTeams : undefined;
    const element: React.ReactElement<IListItemsProps> = React.createElement(
      ListItems,
      {
        listName: this.properties.listName,
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!teamsContext,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
      return super.onInit();
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    const contextAsAny = this.context as any;
    const teamsContext = contextAsAny.microsoftTeams ? contextAsAny.microsoftTeams : undefined;
    if (teamsContext) {
      return Promise.resolve(strings.TeamsEnvironment);
    }

    if (window.location.hostname === 'localhost') {
      return Promise.resolve(strings.LocalSharePointEnvironment);
    }

    return Promise.resolve(strings.SharePointEnvironment);
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
                PropertyPaneTextField('listName', {
                  label: strings.ListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onThemeChanged(currentTheme: string | undefined): void {
    if (currentTheme) {
      this._isDarkTheme = currentTheme === 'dark';
      this.render();
    }
  }
}