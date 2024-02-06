const {program} = require("commander");
const contacts = require("./contacts");

const invokeAction = async ({
                                action,
                                id,
                                name,
                                email,
                                phone,
                            }) => {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.log(allContacts);
            return allContacts;
        case "get":
            const contactById = await contacts.getContactById(id);
            console.log(contactById);
            return contactById;
        case "remove":
            const rmContact = await contacts.removeContact(id);
            console.log(rmContact);
            return rmContact;
        case "add":
            const newContact = await contacts.addContact(name, email, phone);
            console.log(newContact);
            return newContact;
    }
};

program
    .option("-a, action, <type>")
    .option("-i, id, <type>")
    .option("-n, name, <type>")
    .option("-e, email, <type>")
    .option("-p, phone, <type>");

program.parse();
const options = program.opts();

invokeAction(options);