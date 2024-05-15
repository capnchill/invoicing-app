type Invoice = {
	id: string;
	client: Client;
	createdAt: string;
	discount?: number;
	dueDate: string;
	invoiceNumber: string;
	invoiceStatus: InvoiceStatus;
	issueDate: string;
	lineItems?: LineItem[];
	notes?: string;
	subject?: string;
	terms?: string;
};

type Client = {
	id: string;
	clientStatus?: ClientStatus;
	city?: string;
	email: string;
	name: string;
	state?: string;
	street?: string;
	zip?: string;
	invoice?: Invoice[];
};

type LineItem = {
	id: string;
	amount: number;
	description: string;
	quantity: number;
};

type Settings = {
	myName: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zip: string;
};

type NotificationType = 'success' | 'error' | 'info' | 'warning';

type Snackbar = {
	id: string;
	message: string;
	type: NotificationType;
};
