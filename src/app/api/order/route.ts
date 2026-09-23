// src/app/api/order/route.ts

import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer'    // Nếu bạn muốn gửi email, nếu không thì xóa import này
import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

// Kiểu cho đơn hàng
interface OrderPayload {
  name: string
  email: string
  address: string
  phone: string
  bank: string
  note: string
  timestamp: string
}

// Validate đơn giản
function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email)
}
function isNonEmptyString(val: any): boolean {
  return typeof val === 'string' && val.trim().length > 0
}

/**
 * appendOrderToSheet
 * - Đọc file credentials.json (Service Account) từ gốc project
 * - Xác thực JWT
 * - Append một dòng mới vào sheet “Orders”
 */
async function appendOrderToSheet(order: OrderPayload) {
  const credPath = path.join(process.cwd(), 'credentials.json')
  const content = JSON.parse(fs.readFileSync(credPath, 'utf-8'))

  const jwtClient = new google.auth.JWT({
  email: content.client_email,
  key: content.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  
  await jwtClient.authorize()

  const sheets = google.sheets({ version: 'v4', auth: jwtClient })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!  // Đảm bảo .env.local đã có biến này
  const range = 'Orders!A:G'

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        order.timestamp,
        order.name,
        order.email,
        order.phone,
        order.bank,
        order.address,
        order.note
      ]]
    },
  })
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<OrderPayload>

    // 1. Kiểm tra trường bắt buộc
    if (
      !data.name ||
      !data.email ||
      !data.address ||
      !data.phone ||
      !data.bank
    ) {
      return NextResponse.json(
        { error: 'Thiếu trường bắt buộc: name, email, address, phone, bank.' },
        { status: 400 }
      )
    }
    // 2. Kiểm tra định dạng
    if (
      !isNonEmptyString(data.name) ||
      !isValidEmail(data.email) ||
      !isNonEmptyString(data.address) ||
      !isNonEmptyString(data.phone) ||
      !isNonEmptyString(data.bank)
    ) {
      return NextResponse.json(
        { error: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.' },
        { status: 400 }
      )
    }

    // 3. Tạo order hoàn chỉnh
    const order: OrderPayload = {
      name: data.name.trim(),
      email: data.email.trim(),
      address: data.address.trim(),
      phone: data.phone.trim(),
      bank: data.bank.trim(),
      note: data.note ? String(data.note).trim() : '',
      timestamp: new Date().toISOString(),
    }

    // 4. (Tùy chọn) Gửi email thông báo
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT),
    //   secure: process.env.SMTP_SECURE === 'true',
    //   auth: {
    //     user: process.env.SMTP_USER!,
    //     pass: process.env.SMTP_PASS!,
    //   },
    // })
    // await transporter.sendMail({
    //   from: `"ArtStore" <${process.env.SMTP_USER}>`,
    //   to: process.env.RECEIVER_EMAIL!,
    //   subject: `Đơn hàng mới: ${order.name} (${order.bank})`,
    //   html: `
    //     <h2>Đơn hàng mới từ ${order.name}</h2>
    //     <ul>
    //       <li><strong>Email:</strong> ${order.email}</li>
    //       <li><strong>Địa chỉ:</strong> ${order.address}</li>
    //       <li><strong>Điện thoại:</strong> ${order.phone}</li>
    //       <li><strong>Ngân hàng:</strong> ${order.bank}</li>
    //       <li><strong>Ghi chú:</strong> ${order.note}</li>
    //       <li><strong>Thời gian:</strong> ${order.timestamp}</li>
    //     </ul>
    //   `,
    // })

    // 5. Ghi lên Google Sheets
    await appendOrderToSheet(order)

    // 6. Trả về kết quả
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Lỗi xử lý đơn:', err)
    return NextResponse.json({ error: 'Lỗi phía server.' }, { status: 500 })
  }
}

