// // import { sp, Web } from '@pnp/sp';
// // import "@pnp/sp/webs";
// // import "@pnp/sp/lists/web";
// // import "@pnp/sp/items/list";
// // import "@pnp/sp/lists";
// // import "@pnp/sp/fields";
// // import "@pnp/sp/views";
// // import { IInvoice } from '../models/index'
// // import { WebPartContext } from "@microsoft/sp-webpart-base";
// // import { IFieldAddResult, FieldTypes } from "@pnp/sp/fields/types";
// // import { IListInfo } from "@pnp/sp/lists";

// // export class InvoiceService {
// //   private sp: SPFI;

// //   constructor(context: WebPartContext) {
// //     this.sp = spfi().using(SPFx(context));
// //   }

// //   public async getInvoice(listId: string): Promise<IInvoice[]> {

// //     try {
// //       if (listId) {
// //       const list = this.sp.web.lists.getById(listId);
// //       const items = await list.items.select('ID', 'Title', 'billTo')();
// //       return items;
// //       }
// //     } catch (error) {
// //       console.error('Error loading invoices:', error);
// //       return null;
// //     }
// //   }


// // // eslint-disable-next-line  @typescript-eslint/no-explicit-any
// //   public async createList(listName: string): Promise<any> {
// //     try {
// //       // create list
// //       const createList = await this.sp.web.lists.add(listName, "List created by Invoice Generator web part");
// //       const field: IFieldAddResult = await this.sp.web.lists.getByTitle(listName).fields.add("billTo", FieldTypes.Text,
// //         { FieldTypeKind: 3, Group: "Invoice Generator Fields" });
// //       // return list ID
// //       console.log(`List '${listName}' created with ID '${createList.data.Id}' and field '${field.data.InternalName}'.`);
// //       await this.sp.web.lists.getByTitle(listName).defaultView.fields.add("billTo");
// //       return createList.data.Id;
// //     } catch (error) {
// //       console.log("Error creating list or field:", error);
// //       return null;
// //     }

// //   }

// //   public async getLists(): Promise<IListInfo[]> {
// //     try {
// //       const lists = await this.sp.web.lists.select("Id", "Title")();
// //       return lists;
// //     } catch (error) {
// //       console.log(`Error retrieving lists: ${error}`);
// //       return null;
// //     }
// //   }


// //   public async listExists(listName: string): Promise<boolean> {
// //     try {
// //       const lists = await this.sp.web.lists.filter(`Title eq '${listName}'`)();
// //       if (lists.length > 0) {
// //         return true;
// //       }
// //     } catch (error) {
// //       console.error('Error checking if list exists:', error);
// //     }
// //     return false;
// //   }
// // }

// import { sp, Web, FieldTypes } from '@pnp/sp';
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { IListInfo } from '@pnp/sp';
// import { IInvoice } from '../models/index';

// export class InvoiceService {
//   private context: WebPartContext;

//   constructor(context: WebPartContext) {
//     this.context = context;
//     sp.setup({
//       sp: {
//         headers: {
//           "Accept": "application/json;odata=verbose"
//         }
//       }
//     });
//   }

//   public async getInvoice(listId: string): Promise<IInvoice[]> {
//     try {
//       if (listId) {
//         const list = sp.web.lists.getById(listId);
//         const items = await list.items.select('ID', 'Title', 'billTo').get();
//         return items.map((item) => ({
//           ID: item.ID,
//           Title: item.Title,
//           billTo: item.billTo
//         }));
//       } else {
//         return [];
//       }
//     } catch (error) {
//       console.error('Error loading invoices:', error);
//       return [];
//     }
//   }

//   public async createList(listName: string): Promise<string | null> {
//     try {
//       const createdList = await sp.web.lists.add(listName, "List created by Invoice Generator web part");
//       const list = sp.web.lists.getByTitle(listName);
//       await list.fields.add("billTo", FieldTypes.Text, {
//         FieldTypeKind: 3,
//         Group: "Invoice Generator Fields"
//       });
//       await list.defaultView.fields.add("billTo");
//       return createdList.data.Id;
//     } catch (error) {
//       console.log("Error creating list or field:", error);
//       return null;
//     }
//   }

//   public async getLists(): Promise<IListInfo[]> {
//     try {
//       const lists = await sp.web.lists.select("Id", "Title").get();
//       return lists.map(list => ({
//         Id: list.Id,
//         Title: list.Title
//       }));
//     } catch (error) {
//       console.log(`Error retrieving lists: ${error}`);
//       return [];
//     }
//   }

//   public async listExists(listName: string): Promise<boolean> {
//     try {
//       const lists = await sp.web.lists.filter(`Title eq '${listName}'`).get();
//       return lists.length > 0;
//     } catch (error) {
//       console.error('Error checking if list exists:', error);
//       return false;
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
      spfxContext: context
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
      return list.data.Id;
    } catch (error) {
      console.error('Error creating list:', error);
      return null;
    }
  }

  public async getLists(): Promise<{ Id: string; Title: string }[]> {
    try {
      const lists = await sp.web.lists
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
