// import * as React from 'react';
// import { Page, Text, View, Document, Image} from '@react-pdf/renderer';
// import { IInvoiceItem } from '../../../models/index'


// export interface IInvoicePDFProps {
//     invoiceNumber: number;
//     customerName: string;
//     customerAddress: string;
//     companyName: string,
//     companyAddress: string
//     items: IInvoiceItem[];
//     subtotal: number;
//     tax: number;
//     total: number;
//     dueDate: Date;
//     issueDate: Date;
//     logoImage:string,
// }

// export const PDFGenerator: React.FC<IInvoicePDFProps> = ({ items, subtotal, tax, total, invoiceNumber,
//     customerName,
//     customerAddress,
//     companyName,
//     companyAddress, issueDate, dueDate, logoImage }) => {
//         // eslint-disable-next-line  @typescript-eslint/no-explicit-any
//     const styles : any = {
//         page: {
//             flexDirection: 'row',
//             backgroundColor: '#fff',
//             padding: '48pt',
//             fontSize: 12,
//             lineHeight: 1.5,
//         },
//         section: {
//             flexDirection: 'column',
//             width: '100%',
//         },
//         sectionLeft: {
//             width: '50%',
//             marginBottom: '20pt',
//         },
//         sectionRight: {
//             width: '50%',
//             marginBottom: '20pt',
//             marginLeft: '50%',
//           },
//         title: {
//             fontSize: 24,
//             marginBottom: 10,
//             textAlign: 'center',
//             fontWeight: 'bold',
//         },
//         label: {
//             fontSize: 12,
//             fontWeight: 'bold',
//             marginBottom: 5,
//         },
//         companyAddress:{
//             marginBottom: 15,
//         },
//         customerAddress:{
//             marginBottom: 15,
//         },
//         Amount:{
//             marginBottom: 15,
//         },
//         dueDate:{
//             marginBottom: 15,
//         },
//         value: {
//             fontSize: 12,
//             marginBottom: 10,
//         },
//         tableHeader: [
//             {
//                 flexDirection: 'row',
//                 borderBottomWidth: 1,
//                 borderColor: '#000',
//                 alignItems: 'center',
//                 height: 24,
//             },
//         ],
//         tableRow: {
//             flexDirection: 'row',
//             borderBottomWidth: 1,
//             borderColor: '#000',
//             alignItems: 'center',
//             height: 24,
//         },
//         tableCell: {
//             flex: 1,
//             fontSize: 12,
//             paddingLeft: 5,
//             paddingRight: 5,
//         },
//         total: {
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//             marginTop: 10,
//         },
//         address: {
//             marginBottom: '10pt',
//         },
//         logoImage: {
//             height: 100,
//             width: 100,

//           },

//     };

//     return (
//         <Document style={styles.pdfViewer}>

//             <Page size="A4" style={styles.page}>
//                 <View style={styles.section}>
//                 <Image src= {logoImage}  style={styles.logoImage}/>
//                 <Text style={{ textAlign: 'center', marginBottom: '20pt' }}>Invoice</Text>
//                     <View style={{ flexDirection: 'row', marginBottom: '20pt' }}>
//                         <View style={styles.sectionLeft}>
//                             <Text>{companyName}</Text>
//                             <Text style={styles.companyAddress}>{companyAddress}</Text>
//                             <Text >Bill To: {customerName}</Text>
//                             <Text style={styles.customerAddress}>{customerAddress}</Text>
//                             <Text style={styles.label}>Date of Issue:</Text>
//                             <Text>{issueDate.toDateString()}</Text>
//                         </View>
//                         <View style={styles.sectionRight}>
//                             <Text style={styles.label}>Invoice Number:</Text>
//                             <Text>{invoiceNumber}</Text>
//                             <Text style={styles.label}>Amount Due:</Text>
//                             <Text style={styles.Amount}>{`$${total.toFixed(2)}`}</Text>
//                             <Text style={styles.dueDate}>Due Date:</Text>
//                             <Text>{dueDate.toDateString()}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.tableHeader}>
//                         <Text style={styles.tableCell}>Description</Text>
//                         <Text style={styles.tableCell}>Quantity</Text>
//                         <Text style={styles.tableCell}>Price</Text>
//                         <Text style={styles.tableCell}>Total</Text>
//                     </View>
//                     {items.map((item) => (
//                         <View style={styles.tableRow} key={item.id}>
//                             <Text style={styles.tableCell}>{item.description}</Text>
//                             <Text style={styles.tableCell}>{item.quantity}</Text>
//                             <Text style={styles.tableCell}>{item.price.toFixed(2)}</Text>
//                             <Text style={styles.tableCell}>{item.totalAmount.toFixed(2)}</Text>
//                         </View>
//                     ))}
//                     <View style={styles.total}>
//                         <Text style={styles.label}>Subtotal:</Text>
//                         <Text style={styles.value}>{`$ ${subtotal.toFixed(2)}`}</Text>
//                     </View>
//                     <View style={styles.total}>
//                         <Text style={styles.label}>Tax:</Text>
//                         <Text style={styles.value}>{`$ ${tax.toFixed(2)}`}</Text>
//                     </View>
//                     <View style={styles.total}>
//                         <Text style={styles.label}>Total:</Text>
//                         <Text style={styles.value}>{`$ ${total.toFixed(2)}`}</Text>
//                     </View>
//                 </View>
//             </Page>
//         </Document>

//     );
// };

import * as React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { IPDFGeneratorProps } from './IPDFGeneratorProps';

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  invoiceInfo: {
    fontSize: 14,
  },
  companyInfo: {
    fontSize: 14,
  },
  itemsHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    paddingBottom: 8,
    marginBottom: 8,
  },
  itemsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  description: {
    width: '40%',
  },
  quantity: {
    width: '20%',
    textAlign: 'right',
  },
  price: {
    width: '20%',
    textAlign: 'right',
  },
  total: {
    width: '20%',
    textAlign: 'right',
  },
  summary: {
    marginTop: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export class PDFGenerator extends React.Component<IPDFGeneratorProps, {}> {
  constructor(props: IPDFGeneratorProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      invoiceNumber,
      customerName,
      customerAddress,
      companyAddress,
      companyName,
      issueDate,
      dueDate,
      logoImage,
      items,
      subtotal,
      tax,
      total
    } = this.props;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <View>
              <Image style={styles.logo} src={logoImage} />
              <Text style={styles.companyInfo}>{companyName}</Text>
              <Text style={styles.companyInfo}>{companyAddress}</Text>
            </View>
            <View>
              <Text style={styles.invoiceInfo}>Invoice #{invoiceNumber}</Text>
              <Text style={styles.invoiceInfo}>Issue Date: {issueDate.toLocaleDateString()}</Text>
              <Text style={styles.invoiceInfo}>Due Date: {dueDate.toLocaleDateString()}</Text>
            </View>
          </View>
          <Text>Bill To:</Text>
          <Text>{customerName}</Text>
          <Text>{customerAddress}</Text>
          <View style={styles.itemsHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Quantity</Text>
            <Text style={styles.price}>Price</Text>
            <Text style={styles.total}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View style={styles.itemsRow} key={index}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.price}>{item.price.toFixed(2)}</Text>
              <Text style={styles.total}>{item.totalAmount.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.summary}>
            <View style={styles.summaryItem}>
              <Text>Subtotal:</Text>
              <Text>{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Tax:</Text>
              <Text>{tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Total:</Text>
              <Text>{total.toFixed(2)}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  }
}
