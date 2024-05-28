// // // import * as React from 'react';
// // // import styles from './InvoiceGenerator.module.scss';
// // // import { InvoiceService } from '../../services/InvoiceService';
// // // import { IInvoiceItem, IInvoice } from '../../models/index'
// // // import { IInvoiceGeneratorProps } from './IInvoiceGeneratorProps';
// // // import { InvoiceHeader } from './InvoiceHeader/InvoiceHeader';
// // // import { Dropdown } from '@fluentui/react/lib/Dropdown';
// // // import { MessageBar } from '@fluentui/react/lib/MessageBar';
// // // import { InvoiceSummary } from './InvoiceSummary/InvoiceSummary';
// // // import { Icon } from '@fluentui/react/lib/Icon';
// // // import { PDFGenerator } from './PDFGenerator/PDFGenerator';
// // // import { pdf } from '@react-pdf/renderer';
// // // import { InvoiceItemRow } from './InvoiceItemRow/InvoiceItemRow';
// // // import * as strings from 'InvoiceGeneratorWebPartStrings';
// // // import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
// // // import { Customizer } from "@uifabric/utilities/lib/";
// // // import { Dropdown, MessageBar, Icon } from 'office-ui-fabric-react';

// // // Continue from where we left off in the previous message
// // import * as React from 'react';
// // import styles from './InvoiceGenerator.module.scss';
// // import { InvoiceService } from '../../services/InvoiceService';
// // import { IInvoiceItem, IInvoice } from '../../models/index';
// // import { IInvoiceGeneratorProps } from './IInvoiceGeneratorProps';
// // import { InvoiceHeader } from './InvoiceHeader/InvoiceHeader';
// // import { Dropdown, MessageBar, Icon } from 'office-ui-fabric-react';
// // import { InvoiceSummary } from './InvoiceSummary/InvoiceSummary';
// // import { PDFGenerator } from './PDFGenerator/PDFGenerator';
// // import { pdf } from '@react-pdf/renderer';
// // import { InvoiceItemRow } from './InvoiceItemRow/InvoiceItemRow';
// // import * as strings from 'InvoiceGeneratorWebPartStrings';
// // import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
// // import { Customizer } from "@uifabric/utilities";

// // const Plus = (): JSX.Element => <Icon iconName="CirclePlus" />;

// // export const InvoiceGenerator: React.FC<IInvoiceGeneratorProps> = (props) => {
// //   const { context, listId, taxRate, companyAddress, companyName, logoImage, themeVariant } = props;
// //   const [invoices, setInvoices] = React.useState<IInvoice[]>([]);
// //   const [selectedInvoiceIndex, setSelectedInvoiceIndex] = React.useState<string>('0');
// //   const [invoiceItems, setInvoiceItems] = React.useState<IInvoiceItem[]>([]);
// //   const [selectedItem, setSelectedItem] = React.useState<IInvoiceItem>(null);
// //   const [itemDescription, setItemDescription] = React.useState('');
// //   const [quantity, setQuantity] = React.useState(0);
// //   const [price, setPrice] = React.useState(0);
// //   const [showAddItemForm, setShowAddItemForm] = React.useState(false);
// //   const [issueDate, setIssueDate] = React.useState<Date>(new Date());
// //   const [dueDate, setDueDate] = React.useState<Date>(new Date());


// //   React.useEffect(() => {
// //     const invoiceService = new InvoiceService(context);
// //     invoiceService.getInvoice(listId)
// //       .then((data: IInvoice[]) => {
// //         setInvoices(data);
// //       })
// //       .catch((error) => {
// //         console.error('Error loading invoices:', error);

// //       });
// //   }, [listId, context]);

// //   const calculateSubtotal = (): number => {
// //     const subtotal = invoiceItems.reduce((acc, cur) => acc + cur.totalAmount, 0);
// //     return subtotal;
// //   };

// //   const calculateTax = (): number => {
// //     const subtotal = calculateSubtotal();
// //     const taxAmount = (subtotal * taxRate) / 100;
// //     return taxAmount;
// //   };

// //   const calculateTotal = (): number => {

// //     const subtotal = calculateSubtotal();
// //     const taxAmount = calculateTax();
// //     const total = subtotal + taxAmount;

// //     if (isNaN(total)) {
// //       return 0;
// //     }

// //     return total;
// //   };

// //   const onItemSelected = (item: IInvoiceItem): void => {
// //     setSelectedItem(item);
// //     setItemDescription(item.description);
// //     setQuantity(item.quantity);
// //     setPrice(item.price);
// //   };

// //   const toggleAddItemForm = (): void => {
// //     setShowAddItemForm(!showAddItemForm);
// //   };

// //   const handleDeleteItem = (): void => {
// //     if (!selectedItem) {
// //       console.error('No item selected for deletion');
// //       return;
// //     }

// //     try {
// //       const updatedItems = invoiceItems.filter((item) => item !== selectedItem);
// //       setInvoiceItems(updatedItems);
// //       setSelectedItem(null);
// //       setItemDescription('');
// //       setQuantity(0);
// //       setPrice(0);
// //     } catch (error) {
// //       console.error('Error deleting item:', error);
// //     }
// //   };

// //   const handleAddItem = (): void => {
// //     if (!itemDescription || quantity === 0 || price === 0) {
// //       return;
// //     }

// //     const newInvoiceItem: IInvoiceItem = {
// //       description: itemDescription,
// //       id: invoiceItems.length + 1,
// //       quantity,
// //       price,
// //       totalAmount: quantity * price,
// //     };

// //     const updatedItems = [...invoiceItems, newInvoiceItem];

// //     setInvoiceItems(updatedItems);
// //     setItemDescription('');
// //     setQuantity(0);
// //     setPrice(0);
// //     setShowAddItemForm(false);
// //   };


// //   const handlePdfGeneration = async (): Promise<void> => {
// //     if (invoiceItems.length === 0) {

// //       return;
// //     }
// //     const invoiceData = {
// //       items: invoiceItems,
// //       subtotal: calculateSubtotal(),
// //       tax: calculateTax(),
// //       total: calculateTotal(),
// //       invoiceNumber: invoices[Number(selectedInvoiceIndex)]?.ID,
// //       customerName: invoices[Number(selectedInvoiceIndex)]?.Title,
// //       customerAddress: invoices[Number(selectedInvoiceIndex)]?.billTo,
// //       companyAddress,
// //       companyName,
// //       issueDate,
// //       dueDate,
// //       logoImage
// //     };

// //     const pdfContent = <PDFGenerator {...invoiceData} />;
// //     const fileName = `invoice-#000${invoiceData.invoiceNumber}.pdf`;

// //     const blob = await pdf(pdfContent).toBlob();
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement('a');
// //     link.href = url;
// //     link.download = fileName;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const DefaultExample = (): JSX.Element => (
// //     <MessageBar>
// //       Please add items to the invoice before generating a PDF.
// //     </MessageBar>
// //   );

// //   return (
// //     <Customizer settings={{ theme: themeVariant }}>


// //       <div className={styles.invoiceGenerator}>

// //         {(!invoices || invoices.length === 0 || !listId) && (
// //           <Placeholder
// //             iconName="Edit"
// //             iconText="Configure your web part"
// //             description="Please configure the web part properties."
// //             buttonLabel="Configure"
// //             onConfigure={() => {
// //               context.propertyPane.open();
// //             }}
// //             theme={props.themeVariant}
// //           />
// //         )}
// //         {invoices && invoices.length > 0 && (
// //           <>
// //             <div className={styles.invoiceSelect}>
// //               <label style={{ marginRight: '8px', fontWeight: '700' }}>{strings.selectInvoicesLabel}</label>
// //               <Dropdown
// //                 options={invoices.map((invoice, index) => ({
// //                   key: index.toString(),
// //                   text: `${strings.invoiceText} ${invoice.ID} - ${invoice.Title}`,
// //                 }))}
// //                 selectedKey={selectedInvoiceIndex.toString()}
// //                 onChange={(event, option) => setSelectedInvoiceIndex(option.key.toString())}
// //               />
// //             </div>
// //             <div className={styles.header}>
// //               <img className={styles.companyLogo} src={logoImage} alt={strings.companyLogoAlt} height="100" width="100" />
// //               <div className={styles.title}>{strings.invoiceTitle}</div>
// //             </div>

// //             <InvoiceHeader
// //               invoiceNumber={invoices[Number(selectedInvoiceIndex)]?.ID}
// //               customerName={invoices[Number(selectedInvoiceIndex)]?.Title}
// //               customerAddress={invoices[Number(selectedInvoiceIndex)]?.billTo}
// //               companyAddress={companyAddress}
// //               companyName={companyName}
// //               amountdue={calculateTotal()}
// //               issueDate={issueDate}
// //               dueDate={dueDate}
// //               onIssueDateChange={setIssueDate}
// //               onDueDateChange={setDueDate}
// //             />
// //             <div className={styles.itemsContainer}>
// //               <div className={styles.itemsTable}>
// //                 <div className={styles.itemsTableHeader}>
// //                   <div className={styles.itemDescription}>{strings.itemDescriptionText}</div>
// //                   <div className={styles.itemQuantity}>{strings.quantityText}</div>
// //                   <div className={styles.itemPrice}>{strings.priceText}</div>
// //                   <div className={styles.itemTotal}>{strings.totalText}</div>

// //                 </div>
// //                 {showAddItemForm && (
// //                   <div className={styles.addItem}>
// //                     <div className={styles.inputWrapper}>
// //                       <input
// //                         type="text"
// //                         placeholder={strings.itemDescriptionPlaceholder}
// //                         value={itemDescription}
// //                         onChange={(e) => setItemDescription(e.target.value)}
// //                       />
// //                     </div>
// //                     <div className={styles.inputWrapper}>
// //                       <input
// //                         type="number"
// //                         placeholder={strings.quantityPlaceholder}
// //                         value={quantity}
// //                         onChange={(e) => setQuantity(parseInt(e.target.value))}
// //                       />
// //                     </div>
// //                     <div className={styles.inputWrapper}>
// //                       <input
// //                         type="number"
// //                         placeholder={strings.pricePlaceholder}
// //                         value={price}
// //                         onChange={(e) => setPrice(parseFloat(e.target.value))}
// //                       />
// //                     </div>

// //                     <div onClick={handleAddItem} className={styles.submitButton}>{strings.submitButtonText}</div>
// //                   </div>
// //                 )}
// //                 {invoiceItems.map((item) => (
// //                   <InvoiceItemRow
// //                     key={item.id}
// //                     item={item}
// //                     isSelected={item === selectedItem}
// //                     onItemSelected={onItemSelected}
// //                     onDeleteItem={handleDeleteItem}
// //                   />
// //                 ))}

// //                 <div className={styles.fullWidthPlusButton} onClick={toggleAddItemForm}>
// //                   <Plus />{strings.addItemButtonText}
// //                 </div>
// //                 {invoiceItems.length === 0 && showAddItemForm && (
// //                   <DefaultExample />
// //                 )}
// //                 <div className={styles.itemsTableFooter}>
// //                   <InvoiceSummary subtotal={calculateSubtotal()} taxRate={taxRate} total={calculateTotal()} />
// //                   <button className={styles.footerButton} onClick={handlePdfGeneration}>{strings.downloadPdfButtonText}</button>
// //                 </div>

// //               </div>
// //             </div>
// //           </>
// //         )}
// //       </div>

// //     </Customizer>

// //   );
// // }

// import * as React from 'react';
// import styles from './InvoiceGenerator.module.scss';
// import { IInvoiceGeneratorProps } from './IInvoiceGeneratorProps';
// import { InvoiceHeader } from './InvoiceHeader/InvoiceHeader';
// import { InvoiceSummary } from './InvoiceSummary/InvoiceSummary';
// import { InvoiceItemRow } from './InvoiceItemRow/InvoiceItemRow';
// import { PDFGenerator } from './PDFGenerator/PDFGenerator';
// import { InvoiceService } from '../../services/InvoiceService';
// import { IInvoiceItem, IInvoice } from '../../models';
// import { Dropdown } from '@fluentui/react/lib/Dropdown';
// import { MessageBar } from '@fluentui/react/lib/MessageBar';
// import { Icon } from '@fluentui/react/lib/Icon';
// import { pdf } from '@react-pdf/renderer';
// import * as strings from 'InvoiceGeneratorWebPartStrings';
// import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
// import { Customizer } from '@uifabric/utilities';

// const Plus = (): JSX.Element => <Icon iconName="CirclePlus" />;

// interface IInvoiceGeneratorState {
//   invoices: IInvoice[];
//   selectedInvoiceIndex: string;
//   invoiceItems: IInvoiceItem[];
//   selectedItem: IInvoiceItem | null;
//   itemDescription: string;
//   quantity: number;
//   price: number;
//   showAddItemForm: boolean;
//   issueDate: Date;
//   dueDate: Date;
// }

// export class InvoiceGenerator extends React.Component<IInvoiceGeneratorProps, IInvoiceGeneratorState> {
//   private invoiceService: InvoiceService;

//   constructor(props: IInvoiceGeneratorProps) {
//     super(props);

//     this.state = {
//       invoices: [],
//       selectedInvoiceIndex: '0',
//       invoiceItems: [],
//       selectedItem: null,
//       itemDescription: '',
//       quantity: 0,
//       price: 0,
//       showAddItemForm: false,
//       issueDate: new Date(),
//       dueDate: new Date()
//     };

//     this.invoiceService = new InvoiceService(props.context);

//     this.onItemSelected = this.onItemSelected.bind(this);
//     this.toggleAddItemForm = this.toggleAddItemForm.bind(this);
//     this.handleDeleteItem = this.handleDeleteItem.bind(this);
//     this.handleAddItem = this.handleAddItem.bind(this);
//     this.handlePdfGeneration = this.handlePdfGeneration.bind(this);
//     this.calculateSubtotal = this.calculateSubtotal.bind(this);
//     this.calculateTax = this.calculateTax.bind(this);
//     this.calculateTotal = this.calculateTotal.bind(this);
//     this.setIssueDate = this.setIssueDate.bind(this);
//     this.setDueDate = this.setDueDate.bind(this);
//   }

//   public componentDidMount(): void {
//     this.invoiceService.getInvoice(this.props.listId)
//       .then((data: IInvoice[]) => {
//         this.setState({ invoices: data });
//       })
//       .catch((error) => {
//         console.error('Error loading invoices:', error);
//       });
//   }

//   private calculateSubtotal(): number {
//     return this.state.invoiceItems.reduce((acc, cur) => acc + cur.totalAmount, 0);
//   }

//   private calculateTax(): number {
//     const subtotal = this.calculateSubtotal();
//     return (subtotal * this.props.taxRate) / 100;
//   }

//   private calculateTotal(): number {
//     const subtotal = this.calculateSubtotal();
//     const taxAmount = this.calculateTax();
//     const total = subtotal + taxAmount;
//     return isNaN(total) ? 0 : total;
//   }

//   private onItemSelected(item: IInvoiceItem): void {
//     this.setState({
//       selectedItem: item,
//       itemDescription: item.description,
//       quantity: item.quantity,
//       price: item.price
//     });
//   }

//   private toggleAddItemForm(): void {
//     this.setState({ showAddItemForm: !this.state.showAddItemForm });
//   }

//   private handleDeleteItem(): void {
//     if (!this.state.selectedItem) {
//       console.error('No item selected for deletion');
//       return;
//     }

//     try {
//       const updatedItems = this.state.invoiceItems.filter((item) => item !== this.state.selectedItem);
//       this.setState({
//         invoiceItems: updatedItems,
//         selectedItem: null,
//         itemDescription: '',
//         quantity: 0,
//         price: 0
//       });
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   }

//   private handleAddItem(): void {
//     if (!this.state.itemDescription || this.state.quantity === 0 || this.state.price === 0) {
//       return;
//     }

//     const newInvoiceItem: IInvoiceItem = {
//       description: this.state.itemDescription,
//       id: this.state.invoiceItems.length + 1,
//       quantity: this.state.quantity,
//       price: this.state.price,
//       totalAmount: this.state.quantity * this.state.price
//     };

//     const updatedItems = [...this.state.invoiceItems, newInvoiceItem];

//     this.setState({
//       invoiceItems: updatedItems,
//       itemDescription: '',
//       quantity: 0,
//       price: 0,
//       showAddItemForm: false
//     });
//   }

//   private async handlePdfGeneration(): Promise<void> {
//     if (this.state.invoiceItems.length === 0) {
//       return;
//     }

//     const invoiceData = {
//       items: this.state.invoiceItems,
//       subtotal: this.calculateSubtotal(),
//       tax: this.calculateTax(),
//       total: this.calculateTotal(),
//       invoiceNumber: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.ID,
//       customerName: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.Title,
//       customerAddress: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.billTo,
//       companyAddress: this.props.companyAddress,
//       companyName: this.props.companyName,
//       issueDate: this.state.issueDate,
//       dueDate: this.state.dueDate,
//       logoImage: this.props.logoImage
//     };

//     const pdfContent = <PDFGenerator {...invoiceData} />;
//     const fileName = `invoice-#000${invoiceData.invoiceNumber}.pdf`;

//     const blob = await pdf(pdfContent).toBlob();
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   private setIssueDate(date: Date): void {
//     this.setState({ issueDate: date });
//   }

//   private setDueDate(date: Date): void {
//     this.setState({ dueDate: date });
//   }

//   private DefaultExample(): JSX.Element {
//     return (
//       <MessageBar>
//         Please add items to the invoice before generating a PDF.
//       </MessageBar>
//     );
//   }

//   public render(): JSX.Element {
//     const { context, listId, logoImage, themeVariant, companyAddress, companyName } = this.props;
//     const {
//       invoices,
//       selectedInvoiceIndex,
//       invoiceItems,
//       selectedItem,
//       itemDescription,
//       quantity,
//       price,
//       showAddItemForm,
//       issueDate,
//       dueDate
//     } = this.state;

//     return (
//       <Customizer settings={{ theme: themeVariant }}>
//         <div className={styles.invoiceGenerator}>
//           {(!invoices || invoices.length === 0 || !listId) && (
//             <Placeholder
//               iconName="Edit"
//               iconText="Configure your web part"
//               description="Please configure the web part properties."
//               buttonLabel="Configure"
//               onConfigure={() => {
//                 context.propertyPane.open();
//               }}
//               theme={themeVariant}
//             />
//           )}
//           {invoices && invoices.length > 0 && (
//             <>
//               <div className={styles.invoiceSelect}>
//                 <label style={{ marginRight: '8px', fontWeight: '700' }}>{strings.selectInvoicesLabel}</label>
//                 <Dropdown
//                   options={invoices.map((invoice, index) => ({
//                     key: index.toString(),
//                     text: `${strings.invoiceText} ${invoice.ID} - ${invoice.Title}`,
//                   }))}
//                   selectedKey={selectedInvoiceIndex.toString()}
//                   onChange={(event, option) => this.setState({ selectedInvoiceIndex: option.key.toString() })}
//                 />
//               </div>
//               <div className={styles.header}>
//                 <img className={styles.companyLogo} src={logoImage} alt={strings.companyLogoAlt} height="100" width="100" />
//                 <div className={styles.title}>{strings.invoiceTitle}</div>
//               </div>
//               <InvoiceHeader
//                 invoiceNumber={invoices[Number(selectedInvoiceIndex)]?.ID}
//                 customerName={invoices[Number(selectedInvoiceIndex)]?.Title}
//                 customerAddress={invoices[Number(selectedInvoiceIndex)]?.billTo}
//                 companyAddress={companyAddress}
//                 companyName={companyName}
//                 amountdue={this.calculateTotal()}
//                 issueDate={issueDate}
//                 dueDate={dueDate}
//                 onIssueDateChange={this.setIssueDate}
//                 onDueDateChange={this.setDueDate}
//               />
//               <div className={styles.itemsContainer}>
//                 <div className={styles.itemsTable}>
//                   <div className={styles.itemsTableHeader}>
//                     <div className={styles.itemDescription}>{strings.itemDescriptionText}</div>
//                     <div className={styles.itemQuantity}>{strings.quantityText}</div>
//                     <div className={styles.itemPrice}>{strings.priceText}</div>
//                     <div className={styles.itemTotal}>{strings.totalText}</div>
//                   </div>

//                   {showAddItemForm && (
//                     <div className={styles.addItem}>
//                       <div className={styles.inputWrapper}>
//                         <input
//                           type="text"
//                           placeholder={strings.itemDescriptionPlaceholder}
//                           value={itemDescription}
//                           onChange={(e) => this.setState({ itemDescription: e.target.value })}
//                         />
//                       </div>
//                       <div className={styles.inputWrapper}>
//                         <input
//                           type="number"
//                           placeholder={strings.quantityPlaceholder}
//                           value={quantity}
//                           onChange={(e) => this.setState({ quantity: parseInt(e.target.value) })}
//                         />
//                       </div>
//                       <div className={styles.inputWrapper}>
//                         <input
//                           type="number"
//                           placeholder={strings.pricePlaceholder}
//                           value={price}
//                           onChange={(e) => this.setState({ price: parseFloat(e.target.value) })}
//                         />
//                       </div>

//                       <div onClick={this.handleAddItem} className={styles.submitButton}>{strings.submitButtonText}</div>
//                     </div>
//                   )}
//                   {invoiceItems.map((item) => (
//                     <InvoiceItemRow
//                       key={item.id}
//                       item={item}
//                       isSelected={item === selectedItem}
//                       onItemSelected={this.onItemSelected}
//                       onDeleteItem={this.handleDeleteItem}
//                     />
//                   ))}

//                   <div className={styles.fullWidthPlusButton} onClick={this.toggleAddItemForm}>
//                     <Plus />{strings.addItemButtonText}
//                   </div>
//                   {invoiceItems.length === 0 && showAddItemForm && (
//                     this.DefaultExample()
//                   )}
//                   <div className={styles.itemsTableFooter}>
//                     <InvoiceSummary
//                       subtotal={this.calculateSubtotal()}
//                       taxRate={this.props.taxRate}
//                       total={this.calculateTotal()}
//                     />
//                     <button className={styles.footerButton} onClick={this.handlePdfGeneration}>{strings.downloadPdfButtonText}</button>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </Customizer>
//     );
//   }
// }

import * as React from 'react';
import styles from './InvoiceGenerator.module.scss';
import { IInvoiceGeneratorProps } from './IInvoiceGeneratorProps';
import { InvoiceHeader } from './InvoiceHeader/InvoiceHeader';
import { InvoiceSummary } from './InvoiceSummary/InvoiceSummary';
import { InvoiceItemRow } from './InvoiceItemRow/InvoiceItemRow';
import { PDFGenerator } from './PDFGenerator/PDFGenerator';
import { InvoiceService } from '../../services/InvoiceService';
import { IInvoiceItem, IInvoice } from '../../models';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
//import { pdf } from '@react-pdf/renderer';
import * as strings from 'InvoiceGeneratorWebPartStrings';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';

const Plus = () => <Icon iconName="CirclePlus" />;

interface IInvoiceGeneratorState {
  invoices: IInvoice[];
  selectedInvoiceIndex: string;
  invoiceItems: IInvoiceItem[];
  selectedItem: IInvoiceItem | null;
  itemDescription: string;
  quantity: number;
  price: number;
  showAddItemForm: boolean;
  issueDate: Date;
  dueDate: Date;
}

class InvoiceGenerator extends React.Component<IInvoiceGeneratorProps, IInvoiceGeneratorState> {
  private invoiceService: InvoiceService;

  constructor(props: IInvoiceGeneratorProps) {
    super(props);

    this.state = {
      invoices: [],
      selectedInvoiceIndex: '0',
      invoiceItems: [],
      selectedItem: null,
      itemDescription: '',
      quantity: 0,
      price: 0,
      showAddItemForm: false,
      issueDate: new Date(),
      dueDate: new Date()
    };

    this.invoiceService = new InvoiceService(props.context);

    this.onItemSelected = this.onItemSelected.bind(this);
    this.toggleAddItemForm = this.toggleAddItemForm.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handlePdfGeneration = this.handlePdfGeneration.bind(this);
    this.calculateSubtotal = this.calculateSubtotal.bind(this);
    this.calculateTax = this.calculateTax.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.setIssueDate = this.setIssueDate.bind(this);
    this.setDueDate = this.setDueDate.bind(this);
  }

  public componentDidMount(): void {
    this.invoiceService.getInvoice(this.props.listId)
      .then((data: IInvoice[]) => {
        this.setState({ invoices: data });
      })
      .catch((error) => {
        console.error('Error loading invoices:', error);
      });
  }

// Simplify or adjust PDF generation logic as per compatibility
private async handlePdfGeneration(): Promise<void> {
  if (this.state.invoiceItems.length === 0) {
    return;
  }

  const invoiceData = {
    items: this.state.invoiceItems,
    subtotal: this.calculateSubtotal(),
    tax: this.calculateTax(),
    total: this.calculateTotal(),
    invoiceNumber: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.ID,
    customerName: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.Title,
    customerAddress: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.billTo,
    companyAddress: this.props.companyAddress,
    companyName: this.props.companyName,
    issueDate: this.state.issueDate,
    dueDate: this.state.dueDate,
    logoImage: this.props.logoImage
  };

  const fileName = `invoice-#000${invoiceData.invoiceNumber}.pdf`;

  // Generate PDF using a compatible method
  // This needs to be adjusted based on your project's setup and compatibility
}

  private calculateSubtotal(): number {
    return this.state.invoiceItems.reduce((acc, cur) => acc + cur.totalAmount, 0);
  }

  private calculateTax(): number {
    const subtotal = this.calculateSubtotal();
    return (subtotal * this.props.taxRate) / 100;
  }

  private calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const taxAmount = this.calculateTax();
    const total = subtotal + taxAmount;
    return isNaN(total) ? 0 : total;
  }

  private onItemSelected(item: IInvoiceItem): void {
    this.setState({
      selectedItem: item,
      itemDescription: item.description,
      quantity: item.quantity,
      price: item.price
    });
  }

  private toggleAddItemForm(): void {
    this.setState({ showAddItemForm: !this.state.showAddItemForm });
  }

  private handleDeleteItem(): void {
    if (!this.state.selectedItem) {
      console.error('No item selected for deletion');
      return;
    }

    try {
      const updatedItems = this.state.invoiceItems.filter((item) => item !== this.state.selectedItem);
      this.setState({
        invoiceItems: updatedItems,
        selectedItem: null,
        itemDescription: '',
        quantity: 0,
        price: 0
      });
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  private handleAddItem(): void {
    if (!this.state.itemDescription || this.state.quantity === 0 || this.state.price === 0) {
      return;
    }

    const newInvoiceItem: IInvoiceItem = {
      description: this.state.itemDescription,
      id: this.state.invoiceItems.length + 1,
      quantity: this.state.quantity,
      price: this.state.price,
      totalAmount: this.state.quantity * this.state.price
    };

    const updatedItems = [...this.state.invoiceItems, newInvoiceItem];

    this.setState({
      invoiceItems: updatedItems,
      itemDescription: '',
      quantity: 0,
      price: 0,
      showAddItemForm: false
    });
  }

  private async handlePdfGeneration(): Promise<void> {
    if (this.state.invoiceItems.length === 0) {
      return;
    }

    const invoiceData = {
      items: this.state.invoiceItems,
      subtotal: this.calculateSubtotal(),
      tax: this.calculateTax(),
      total: this.calculateTotal(),
      invoiceNumber: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.ID,
      customerName: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.Title,
      customerAddress: this.state.invoices[Number(this.state.selectedInvoiceIndex)]?.billTo,
      companyAddress: this.props.companyAddress,
      companyName: this.props.companyName,
      issueDate: this.state.issueDate,
      dueDate: this.state.dueDate,
      logoImage: this.props.logoImage
    };

    const pdfContent = <PDFGenerator {...invoiceData} />;
    const fileName = `invoice-#000${invoiceData.invoiceNumber}.pdf`;

    const blob = await pdf(pdfContent).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private setIssueDate(date: Date): void {
    this.setState({ issueDate: date });
  }

  private setDueDate(date: Date): void {
    this.setState({ dueDate: date });
  }

  private DefaultExample(): JSX.Element {
    return (
      <MessageBar>
        Please add items to the invoice before generating a PDF.
      </MessageBar>
    );
  }

  public render(): JSX.Element {
    const { context, listId, logoImage, themeVariant, companyAddress, companyName } = this.props;
    const {
      invoices,
      selectedInvoiceIndex,
      invoiceItems,
      selectedItem,
      itemDescription,
      quantity,
      price,
      showAddItemForm,
      issueDate      ,
      dueDate
    } = this.state;

    return (
      <Customizer settings={{ theme: themeVariant }}>
        <div className={styles.invoiceGenerator}>
          {(!invoices || invoices.length === 0 || !listId) && (
            <Placeholder
              iconName="Edit"
              iconText="Configure your web part"
              description="Please configure the web part properties."
              buttonLabel="Configure"
              onConfigure={() => {
                context.propertyPane.open();
              }}
              theme={themeVariant}
            />
          )}
          {invoices && invoices.length > 0 && (
            <>
              <div className={styles.invoiceSelect}>
                <label style={{ marginRight: '8px', fontWeight: '700' }}>{strings.selectInvoicesLabel}</label>
                <Dropdown
                  options={invoices.map((invoice, index) => ({
                    key: index.toString(),
                    text: `${strings.invoiceText} ${invoice.ID} - ${invoice.Title}`,
                  }))}
                  selectedKey={selectedInvoiceIndex.toString()}
                  onChange={(event, option) => this.setState({ selectedInvoiceIndex: option.key.toString() })}
                />
              </div>
              <div className={styles.header}>
                <img className={styles.companyLogo} src={logoImage} alt={strings.companyLogoAlt} height="100" width="100" />
                <div className={styles.title}>{strings.invoiceTitle}</div>
              </div>
              <InvoiceHeader
                invoiceNumber={invoices[Number(selectedInvoiceIndex)]?.ID}
                customerName={invoices[Number(selectedInvoiceIndex)]?.Title}
                customerAddress={invoices[Number(selectedInvoiceIndex)]?.billTo}
                companyAddress={companyAddress}
                companyName={companyName}
                amountdue={this.calculateTotal()}
                issueDate={issueDate}
                dueDate={dueDate}
                onIssueDateChange={this.setIssueDate}
                onDueDateChange={this.setDueDate}
              />
              <div className={styles.itemsContainer}>
                <div className={styles.itemsTable}>
                  <div className={styles.itemsTableHeader}>
                    <div className={styles.itemDescription}>{strings.itemDescriptionText}</div>
                    <div className={styles.itemQuantity}>{strings.quantityText}</div>
                    <div className={styles.itemPrice}>{strings.priceText}</div>
                    <div className={styles.itemTotal}>{strings.totalText}</div>
                  </div>

                  {showAddItemForm && (
                    <div className={styles.addItem}>
                      <div className={styles.inputWrapper}>
                        <input
                          type="text"
                          placeholder={strings.itemDescriptionPlaceholder}
                          value={itemDescription}
                          onChange={(e) => this.setState({ itemDescription: e.target.value })}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <input
                          type="number"
                          placeholder={strings.quantityPlaceholder}
                          value={quantity}
                          onChange={(e) => this.setState({ quantity: parseInt(e.target.value) })}
                        />
                      </div>
                      <div className={styles.inputWrapper}>
                        <input
                          type="number"
                          placeholder={strings.pricePlaceholder}
                          value={price}
                          onChange={(e) => this.setState({ price: parseFloat(e.target.value) })}
                        />
                      </div>

                      <div onClick={this.handleAddItem} className={styles.submitButton}>{strings.submitButtonText}</div>
                    </div>
                  )}
                  {invoiceItems.map((item) => (
                    <InvoiceItemRow
                      key={item.id}
                      item={item}
                      isSelected={item === selectedItem}
                      onItemSelected={this.onItemSelected}
                      onDeleteItem={this.handleDeleteItem}
                    />
                  ))}

                  <div className={styles.fullWidthPlusButton} onClick={this.toggleAddItemForm}>
                    <Plus />{strings.addItemButtonText}
                  </div>
                  {invoiceItems.length === 0 && showAddItemForm && (
                    this.DefaultExample()
                  )}
                  <div className={styles.itemsTableFooter}>
                    <InvoiceSummary
                      subtotal={this.calculateSubtotal()}
                      taxRate={this.props.taxRate}
                      total={this.calculateTotal()}
                    />
                    <button className={styles.footerButton} onClick={this.handlePdfGeneration}>{strings.downloadPdfButtonText}</button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Customizer>
    );
  }
}

export default InvoiceGenerator;

