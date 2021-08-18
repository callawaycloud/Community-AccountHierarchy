import { LightningElement, api } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
import getAccounts from "@salesforce/apex/CommunityAccountHierarchyHelper.getAccounts";

export default class CommunityAccountHierarchy extends NavigationMixin(
  LightningElement
) {
  @api numberOfRecords;
  items = [];

  connectedCallback() {
    getAccounts({ numberOfRecords: this.numberOfRecords })
      .then((accounts) => {
        console.log("accounts", accounts);
        this.items = this.otherTransform(accounts);
        console.log("items", this.items);
      })
      .catch((error) => {
        this.displayToast("Error", this.getWireError(error), "error");
      });
  }

  // https://stackoverflow.com/questions/29280317/convert-from-self-reference-array-into-nested-array-in-tree
  otherTransform(originalArray) {
    // Create a map of id to record for performance
    let array = {}; // Create the object
    const len = originalArray.length;
    for (let i = 0; i < len; i++) {
      // Add properties needed for tree
      originalArray[i].label = originalArray[i].Name;
      originalArray[i].name = originalArray[i].Id;

      array[originalArray[i].Id] = originalArray[i]; // Store by Id
    }

    // Build out the hierarchy
    // Using "in" syntax to iterate over object keys (Ids)
    let nested = [];
    for (let i in array) {
      if (Object.prototype.hasOwnProperty.call(array, i)) {
        let parent = array[i].ParentId;
        if (!parent) {
          array[i].expanded = true;
          nested.push(array[i]);
        } else {
          array[parent].items = array[parent].items || [];
          array[parent].items.push(array[i]);
        }
      }
    }
    return nested;
  }

  handleOnselect(event) {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: event.detail.name,
        actionName: "view"
      }
    });
  }

  getWireError(error) {
    let message = "Unknown error";
    if (Array.isArray(error.body)) {
      message = error.body.map((e) => e.message).join(", ");
    } else if (typeof error.body.message === "string") {
      message = error.body.message;
    }
    return message;
  }

  displayToast(title, message, variant) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
      })
    );
  }
}
