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
