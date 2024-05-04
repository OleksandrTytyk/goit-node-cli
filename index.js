import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

const contacts = await listContacts();

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return console.table(contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      return console.table(newContact);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
