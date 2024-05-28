declare interface IListItemsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  ItemFieldLabel: string;
  TeamsEnvironment: string;
  LocalSharePointEnvironment: string;
  SharePointEnvironment: string;
}

declare module 'ListItemsWebPartStrings' {
  const strings: IListItemsWebPartStrings;
  export = strings;
}