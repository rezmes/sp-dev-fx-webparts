// import * as React from 'react';
// import styles from './ListItems.module.scss';
// import { IListItemsProps } from './IListItemsProps';
// import { escape } from '@microsoft/sp-lodash-subset';

// export default class ListItems extends React.Component < IListItemsProps, {} > {
//   public render(): React.ReactElement<IListItemsProps> {
//     const {
//       description,
//       isDarkTheme,
//       environmentMessage,
//       hasTeamsContext,
//       userDisplayName,
//       listName
//     } = this.props;
//     return(
//       <section className={`${styles.listItems} ${hasTeamsContext ? styles.teams : ''}`}>
//         <div className={styles.welcome}>
//           <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//           <h2>Well done, {escape(userDisplayName)}!</h2>
//           <div>{environmentMessage}</div>
//           <div>List name: <strong>{escape(listName)}</strong></div>
//         </div>
//       </section>
//     );
//   }
// }
import * as React from 'react';
import styles from './ListItems.module.scss';

export interface IListItemsProps {
  listName: string;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export default class ListItems extends React.Component<IListItemsProps, {}> {
  public render(): React.ReactElement<IListItemsProps> {
    const { listName, description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = this.props;

    return (
      <div className={`${styles.listItems} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome, {userDisplayName}!</span>
              
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{environmentMessage}</p>
              <a className={styles.button} href={`/_layouts/15/viewlsts.aspx?list=${listName}`}>
                <span className={styles.label}>Go to List</span>
              </a>
              {hasTeamsContext && (
                <div className={styles.welcome}>
                  <p>You're using Microsoft Teams!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}