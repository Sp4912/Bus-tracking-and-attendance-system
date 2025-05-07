# 🚍 School Bus Attendance and Tracking System

## Description
A full-stack web application to manage and monitor school bus attendance and live tracking to ensure student safety. Built with Node.js, Express.js, React.js, MongoDB, and BootStrap CSS.

## 🧾 Overview
**This application addresses the safety concerns of school transportation by:**
* Tracking attendance of students as they Present/Absent in the bus.
* Sending real-time SMS alerts to parents.
* Providing a dashboard for Admin to manage Users, Attenders, Routes, Buses, Drivers.
* Providing a dashboard for Attender to manage Students.

## Features
- **User Authentication**: Admin, Attender, and school staff can authenticate and access different dashboards.
- **Bus Tracking**: Real-time bus location tracking on a map.
- **Attendance System**: Mark student attendance based on bus arrivals.
- **Notifications**: Parents receive attendance and bus arrival notifications.
- **Admin Dashboard**: Admins can manage bus routes, students, and attendance records.
- **Attender Dashboard**: Attender can Mark Students Present/Absent.

## 🛠 Tech Stack
- **Frontend**: React, BootStrap CSS.
- **Backend**: Node.js, Express.js.
- **Authentication**: JWT (JSON Web Token).
- **Database**: MongoDB.
- **Notifications**: Twilio/Nodemailer (for sending Sms/Emails).

## 🚀 Features
* **👩‍🏫 Admin Panel**
* Admin Login.
* Manage students and attendants.
* Assign routes and buses.
* View attendance logs.

* **🚌 Attendant Dashboard**
* Attender Login.
* View student list.
* Mark attendance (Present/Absent).
* Send SMS alerts to parents.

## 🔌 API Endpoints
* **Authentication**
* POST /api/auth/login
* POST /api/auth/register (admin only)

* **Students**
* GET /api/students
* POST /api/students
* PUT /api/students/:id
* DELETE /api/students/:id

* **Buses**
* GET /api/buses
* POST /api/buses/update-location

* **Attendance**
* POST /api/attendance/mark
* GET /api/attendance/:studentId

## 🖼 Screenshots

* **Main Dashboard**

* **Admin Login**

* **Attender Login**

* **Admin Dashboard**

* **Attender Dashboard**


## 👨‍👩‍👧‍👦 Team Members
* Name - [ Dipali Wable ], Role - [ Backend Developer ], Responsibilities - [ Express.js APIs, MongoDB Models, Auth, Attendance APIs ].
* Name - [ Suraj Aghav ], Role - [ Frontend Developer ], Responsibilities - [ React UI, BootStrap Styling, Routing, Axios Integration ].
* Name - [ Soham Pawar ], Role - [ Full Stack Developer ], Responsibilities - [ Backend-Frontend Integration, SMS Integration, Final Testing, Documentation ].

## 📧 Contact
For inquiries: @gmail.com

## Coming Soon
