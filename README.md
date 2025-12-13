# Point of Sale (POS) Web Application – Phone Store

## 📌 Overview
This project is a **Point of Sale (POS) web application** developed for a phone and accessories retail store.  
The system is designed **exclusively for internal use** by **store administrators and sales staff**, not for customers.

The application supports core POS functionalities such as:
- Sales transactions
- Product management
- Employee management
- Customer management
- Reporting and analytics

This project was developed as the **Final Project for the course _Web Programming and Applications_ (Semester 2, 2023–2024)**.

---

## 👥 User Roles
- **Administrator**
  - Manage employees and products
  - View full sales reports and profit
- **Salesperson**
  - Process transactions
  - View products, customers, and sales history

---

## 🔑 Authentication & Account Management
- A default administrator account is available:
  - **Username:** `admin`
  - **Password:** `admin`
- Salesperson accounts are **created by the administrator only**
- After account creation:
  - A **login email** with a **1-minute valid link** is sent
  - New employees **must log in via email link**
  - First-time login requires **changing password**
- Employees can:
  - View and update profile information
  - Change password and profile picture
- Administrators can:
  - Lock/unlock accounts
  - Resend login email
  - View employee sales information

---

## 📦 Product Management (Admin Only)
- View product list
- Add, update, and delete products
- Each product includes:
  - Barcode
  - Product name
  - Import price
  - Retail price
  - Category
  - Creation date
- Products **cannot be deleted** once they appear in an order
- Sales staff:
  - Can view products
  - Cannot edit or see import prices

---

## 👤 Customer Management
- Customers are created **automatically at checkout**
- Identified by phone number
- System auto-fills customer information for returning customers
- Employees can view:
  - Customer personal information
  - Purchase history
  - Order details

---

## 🧾 Transaction Processing
- Core POS functionality
- Products can be added by:
  - Searching by name
  - Entering barcode
- Features:
  - Real-time cart updates
  - Quantity adjustment
  - Automatic total calculation
- Checkout includes:
  - Customer phone lookup
  - Cash received & change calculation
  - Invoice generation (PDF simulation)

---

## 📊 Reporting & Analytics
- Reports available by:
  - Today
  - Yesterday
  - Last 7 days
  - This month
  - Custom date range
- Displays:
  - Total revenue
  - Number of orders
  - Number of products sold
- Admins can view:
  - Additional profit-related information

---

## 🛠️ Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: (according to implementation)
- Database: (according to implementation)
- Email service for account activation
- PDF invoice generation

---

## 🚀 Deployment
- The application is packaged and deployable
- Users can access and use the system without critical errors

---

---

## 📎 Notes
- This POS system is **not an e-commerce website**
- Customers cannot access or place orders directly
- Designed to simulate real-world retail POS workflows in Vietnam
