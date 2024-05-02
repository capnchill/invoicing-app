type Invoice = {
	id: string;
	client: client;
	createdAt: string;
	dueDate: string;
	invoiceNumber: string;
	invoiceStatus: InvoiceStatus;
	issueDate: string;
	lineItems?: lineItems[];
	notes?: string;
	subject?: string;
	terms?: string;
};

type client = {
	id: string;
	city: string;
	clientStatus: ClientStatus;
	email: string;
	name: string;
	state: string;
	street: string;
	zipCode: string;
};

type lineItems = {
	Id: string;
	amount: number;
	description: string;
	quantity: number;
};
