import { jsPDF } from 'jspdf';
import { CartItem } from '../types';

interface InvoiceData {
    orderId: string;
    customer: {
        name: string;
        phone: string;
        email?: string;
        address?: string;
    };
    items: CartItem[];
    total: number;
    notes?: string;
    date: string;
}

export const generateInvoicePDF = (data: InvoiceData): Blob => {
    const doc = new jsPDF();
    const sapphireDeep = '#0b2a4a';
    const sapphireLight = '#3b82f6';
    const white = '#ffffff';
    const softGray = '#f8fafc';

    // --- SAPPHIRE HEADER ---
    doc.setFillColor(sapphireDeep);
    doc.rect(0, 0, 210, 50, 'F');

    // Aesthetic Accent Line
    doc.setDrawColor(sapphireLight);
    doc.setLineWidth(1);
    doc.line(0, 50, 210, 50);

    doc.setTextColor(white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text("L'ESSENCE ROYALE", 20, 25);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(sapphireLight);
    doc.text("THE SAPPHIRE ARCHIVE • 2026 EDITION", 20, 32);

    doc.setTextColor(white);
    doc.setFontSize(14);
    doc.text(`INVOICE #${data.orderId}`, 190, 25, { align: 'right' });
    doc.setFontSize(9);
    doc.text(data.date, 190, 32, { align: 'right' });

    // --- BODY CONTENT ---
    let y = 70;

    // --- BILLING SECTION ---
    doc.setTextColor(sapphireDeep);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("CLIENT ARCHIVE", 20, y);

    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(50, 50, 50);
    doc.text(data.customer.name, 20, y);
    y += 5;
    doc.text(data.customer.phone, 20, y);
    if (data.customer.email) {
        y += 5;
        doc.text(data.customer.email, 20, y);
    }
    if (data.customer.address) {
        y += 5;
        const splitAddress = doc.splitTextToSize(data.customer.address, 100);
        doc.text(splitAddress, 20, y);
        y += (splitAddress.length * 5);
    }

    // --- TABLE HEADER ---
    y = Math.max(y + 15, 120);
    doc.setFillColor(softGray);
    doc.rect(20, y, 170, 10, 'F');

    doc.setTextColor(sapphireDeep);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text("RESONANCE (ITEM)", 25, y + 6.5);
    doc.text("QTY", 120, y + 6.5);
    doc.text("UNIT", 145, y + 6.5);
    doc.text("TOTAL", 175, y + 6.5);

    // --- ITEMS ---
    y += 15;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    data.items.forEach((item) => {
        const itemPrice = typeof item.price === 'number' ? item.price : 0;
        const itemQty = typeof item.quantity === 'number' ? item.quantity : 0;
        doc.text(`${(item.name || 'ESSENCE').toUpperCase()} / ${item.size || 'N/A'}`, 25, y);
        doc.text(`${itemQty}`, 122, y);
        doc.text(`EURO ${itemPrice.toFixed(2)}`, 145, y);
        doc.text(`EURO ${(itemPrice * itemQty).toFixed(2)}`, 175, y);

        // Soft separator
        doc.setDrawColor(240);
        doc.setLineWidth(0.1);
        doc.line(20, y + 3, 190, y + 3);

        y += 12;
    });

    // --- TOTAL CALCULATION ---
    y += 10;
    doc.setFillColor(sapphireDeep);
    doc.rect(130, y, 60, 20, 'F');

    doc.setTextColor(white);
    doc.setFontSize(8);
    doc.text("GRAND TOTAL", 135, y + 7);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const safeTotal = isNaN(data.total) ? 0 : data.total;
    doc.text(`EURO ${safeTotal.toFixed(2)}`, 135, y + 15);

    // --- SAPPHIRE ACCENT ---
    doc.setDrawColor(sapphireLight);
    doc.setLineWidth(2);
    doc.line(20, 275, 40, 275);

    // --- FOOTER ---
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.setFont('helvetica', 'normal');
    doc.text("L'ESSENCE ROYALE | SECURE ARCHIVE", 20, 285);
    doc.text("ENCRYPTED TRANSACTION VERIFIED", 20, 289);

    doc.text("BOUTIQUE SUPPORT: +4915560549529", 190, 285, { align: 'right' });

    return doc.output('blob');
};
