const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
    const buffer = await fs.readFile(contactsPath);
    return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex(el => el.id === id);

    if (index === -1) return null;

    return contacts[index];
};

const removeContact = async (contactId) => {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex(el => el.id === id);

    if (index === -1) return null;

    const [rmContact] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return rmContact;
};

const addContact = async (name, email, phone) => {
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    const contacts = await listContacts();

    contacts.push(newContact);

    await fs.writeFile(dbContactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};