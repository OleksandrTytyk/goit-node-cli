import * as fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.resolve("./db/contacts.json");
const contacts = await listContacts();

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) return null;
  return contact;
}

console.log("contact:", getContactById("Z5sbDlS7pCzNsnAHLtDJd"));

async function removeContact(contactId) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const removedContact = contacts[index];
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;

  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
  // ...твій код. Повертає об'єкт доданого контакту (з id).
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
