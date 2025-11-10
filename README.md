# 💸 Expense Tracker App

A modern expense tracking web app built with **React**, **TypeScript**, and **Supabase**.  
Easily manage your personal or project-based expenses, upload receipts, and get automatic insights — all in one place.

---

## ✨ Features

- 🔐 **Authentication** — secure sign-up, sign-in, and password recovery via Supabase Auth.
- 📁 **Projects** — organize expenses by projects or categories.
- 💰 **Expenses Management** — add, edit, and delete expenses with fields like:
  - Description  
  - Amount  
  - Quantity  
  - Payment Type  
  - Currency  
  - Attached Invoice (receipt photo)
- 🧾 **Invoice Uploads** — automatically extract data from receipts using AI (Veryfi / future OpenAI Vision integration).
- 📊 **Analytics (coming soon)** — insights and summaries of spending patterns.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + TypeScript + Vite + Tanstack Query + Zustand |
| Backend | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| Deployment | Vercel (Frontend) + Supabase (Backend) |
| Styling | TailwindCSS + shadcn/ui |
| AI / OCR | Veryfi API → future GPT-4o integration |

---
