// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { sp } from '@pnp/sp';
// import { IInvoice, IInvoiceItem } from '../models';

// export class InvoiceService {
//   private context: WebPartContext;

//   constructor(context: WebPartContext) {
//     this.context = context;
//     sp.setup({
//       sp: {
//         baseUrl: this.context.pageContext.web.absoluteUrl
//       }
//     });
//   }

//   public async getInvoice(listId: string): Promise<IInvoice[]> {
//     try {
//       const items: any[] = await sp.web.lists.getById(listId).items.getAll();
//       return items.map((item) => ({
//         ID: item.ID,
//         Title: item.Title,
//         billTo: item.BillTo || '',
//       }));
//     } catch (error) {
//       console.error('Error fetching invoices:', error);
//       return [];
//     }
//   }

//   public async getInvoiceItems(invoiceId: number): Promise<IInvoiceItem[]> {
//     try {
//       const items: any[] = await sp.web.lists
//         .getByTitle('InvoiceItems')
//         .items.filter(`InvoiceId eq ${invoiceId}`)
//         .getAll();

//       return items.map((item) => ({
//         id: item.ID,
//         description: item.Description,
//         quantity: item.Quantity,
//         price: item.Price,
//         totalAmount: item.Quantity * item.Price
//       }));
//     } catch (error) {
//       console.error(`Error fetching invoice items for invoice ID ${invoiceId}:`, error);
//       return [];
//     }
//   }

//   public async createInvoiceItem(invoiceId: number, item: IInvoiceItem): Promise<void> {
//     try {
//       await sp.web.lists.getByTitle('InvoiceItems').items.add({
//         InvoiceId: invoiceId,
//         Description: item.description,
//         Quantity: item.quantity,
//         Price: item.price
//       });
//     } catch (error) {
//       console.error(`Error creating invoice item for invoice ID ${invoiceId}:`, error);
//     }
//   }

//   public async deleteInvoiceItem(itemId: number): Promise<void> {
//     try {
//       await sp.web.lists.getByTitle('InvoiceItems').items.getById(itemId).delete();
//     } catch (error) {
//       console.error(`Error deleting invoice item with ID ${itemId}:`, error);
//     }
//   }

//   public async listExists(listName: string): Promise<boolean> {
//     try {
//       await sp.web.lists.getByTitle(listName).get();
//       return true;
//     } catch {
//       return false;
//     }
//   }

//   public async createList(listName: string): Promise<string | null> {
//     try {
//       const list = await sp.web.lists.add(listName, '', 100);
//       return list.data.Id;
//     } catch (error) {
//       console.error('Error creating list:', error);
//       return null;
//     }
//   }

//   public async getLists(): Promise<{ Id: string; Title: string }[]> {
//     try {
//       const lists = await sp.web.lists
//         .filter('BaseTemplate eq 100')
//         .select('Id', 'Title')
//         .get();

//       return lists.map((list: { Id: string; Title: string }) => ({
//         Id: list.Id,
//         Title: list.Title
//       }));
//     } catch (error) {
//       console.error('Error fetching lists:', error);
//       return [];
//     }
//   }
// }
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import { IInvoice, IInvoiceItem } from '../models';

export class InvoiceService {
  private context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
    sp.setup({
      sp: {
        baseUrl: this.context.pageContext.web.absoluteUrl
      }
    });
  }

  public async getInvoice(listId: string): Promise<IInvoice[]> {
    try {
      const items: any[] = await sp.web.lists.getById(listId).items.getAll();
      return items.map((item) => ({
        ID: item.ID,
        Title: item.Title,
        billTo: item.BillTo || '',
      }));
    } catch (error) {
      console.error('Error fetching invoices:', error);
      return [];
    }
  }

  public async getInvoiceItems(invoiceId: number): Promise<IInvoiceItem[]> {
    try {
      const items: any[] = await sp.web.lists
        .getByTitle('InvoiceItems')
        .items.filter(`InvoiceId eq ${invoiceId}`)
        .getAll();

      return items.map((item) => ({
        id: item.ID,
        description: item.Description,
        quantity: item.Quantity,
        price: item.Price,
        totalAmount: item.Quantity * item.Price
      }));
    } catch (error) {
      console.error(`Error fetching invoice items for invoice ID ${invoiceId}:`, error);
      return [];
    }
  }

  public async createInvoiceItem(invoiceId: number, item: IInvoiceItem): Promise<void> {
    try {
      await sp.web.lists.getByTitle('InvoiceItems').items.add({
        InvoiceId: invoiceId,
        Description: item.description,
        Quantity: item.quantity,
        Price: item.price
      });
    } catch (error) {
      console.error(`Error creating invoice item for invoice ID ${invoiceId}:`, error);
    }
  }

  public async deleteInvoiceItem(itemId: number): Promise<void> {
    try {
      await sp.web.lists.getByTitle('InvoiceItems').items.getById(itemId).delete();
    } catch (error) {
      console.error(`Error deleting invoice item with ID ${itemId}:`, error);
    }
  }

  public async listExists(listName: string): Promise<boolean> {
    try {
      await sp.web.lists.getByTitle(listName).get();
      return true;
    } catch {
      return false;
    }
  }

  public async createList(listName: string): Promise<string | null> {
    try {
      const list = await sp.web.lists.add(listName, '', 100);
      return list.data.Id || null;
    } catch (error) {
      console.error('Error creating list:', error);
      return null;
    }
  }

  public async getLists(): Promise<{ Id: string; Title: string }[]> {
    try {
      const lists: { Id: string; Title: string }[] = await sp.web.lists
        .filter('BaseTemplate eq 100')
        .select('Id', 'Title')
        .get();

      return lists.map((list) => ({
        Id: list.Id,
        Title: list.Title
      }));
    } catch (error) {
      console.error('Error fetching lists:', error);
      return [];
    }
  }
}
