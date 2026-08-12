import prisma from "../../lib/prisma.js";
import { ICreateLeadInput, IUpdateLeadInput } from "./lead.interface.js";

export class LeadService {
	public static async getAllLeads() {
		return await prisma.lead.findMany({
			orderBy: { createdAt: "desc" },
		});
	}

	public static async createLead(data: ICreateLeadInput) {
		return await prisma.lead.create({
			data: {
				name: data.name || "Client Inquiry",
				email: data.email || "",
				phone: data.phone || data.phoneNumber || "",
				message: data.message || "",
				propertyId: data.propertyId || null,
				status: "new",
			},
		});
	}

	public static async updateLead(id: string, data: IUpdateLeadInput) {
		return await prisma.lead.update({
			where: { id },
			data: {
				status: data.status,
				name: data.name,
				email: data.email,
				phone: data.phone,
				message: data.message,
			},
		});
	}
}
