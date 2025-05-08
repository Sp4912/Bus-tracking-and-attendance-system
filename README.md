# 🚍 School Bus Attendance and Tracking System

## Description
A full-stack web application to manage and monitor school bus attendance and live tracking to ensure student safety. Built with Node.js, Express.js, React.js, MongoDB, and BootStrap CSS.

## 🧾 Overview
**This application addresses the safety concerns of school transportation by:**
* Tracking attendance of students as they Present/Absent in the bus.
* Sending real-time SMS alerts to parents.
* Providing a dashboard for Admin to manage Students, Attenders, Routes, Buses, Drivers.
* Providing a dashboard for Attender to manage Students Attendance.

## Features
- **User Authentication**: Admin, Attender.
- **Attendance System**: Mark student attendance based on bus arrivals.
- **Notifications**: Parents receive attendance notifications.
- **Admin Dashboard**: Admins can manage bus routes, students, and attendance records.
- **Attender Dashboard**: Attender can Mark Students Present/Absent.

## 🛠 Tech Stack
- **Frontend**: React, BootStrap CSS.
- **Backend**: Node.js, Express.js.
- **Authentication**: JWT (JSON Web Token).
- **Database**: MongoDB.
- **Notifications**: Twilio (for sending Sms).

## 🚀 Features
* **👩‍🏫 Admin Panel**
* Admin Login.
* Manage students and attenders.
* Assign driver, routes and buses.
* View attendance logs.

* **🚌 Attender Dashboard**
* Attender Login.
* View student list.
* Mark attendance (Present/Absent).
* Send SMS alerts to parents.

## 🔌 API Endpoints
* **Admin**
* POST /api/admins/login

* **Attenders**
* POST /api/attenders/register
* POST /api/attenders/login
* PUT /api/attenders/:attenderId
* DELETE /api/attenders/:attenderId
* GET /api/attenders/
* GET /api/attenders/:attenderId

* **Students**
* GET /api/students/my-bus
* POST /api/students/register
* GET /api/students/
* GET /api/students/sid/:studentId
* PUT /api/students/sid/:studentId
* DELETE /api/students/sid/:studentId
* GET /api/students/:id
* PUT /api/students/:id
* DELETE /api/students/:id

* **Drivers**
* POST /api/drivers/register
* PUT /api/drivers/:driverId
* DELETE /api/drivers/:driverId
* GET /api/drivers/
* GET /api/drivers/:driverId

* **Buses**
* POST /api/buses/
* GET /api/buses/
* GET /api/buses/details/:busNo
* GET /api/buses/busno/:busNo
* PUT /api/buses/busno/:busNo
* DELETE /api/buses/busno/:busNo

* **Attendance**
* POST /api/attendance/
* GET /api/attendance/
* GET /api/attendance/students/my-bus
* GET /api/attendance/mine
* GET /api/attendance/:id

## 🖼 Screenshots

* **Main Dashboard**

* **Admin Login**

* **Attender Login**

* **Admin Dashboard**

* **Attender Dashboard**


## 👨‍👩‍👧‍👦 Team Members
* Name - [ Dipali Wable ], Role - [ Backend Developer ], Responsibilities - [ Express.js APIs, MongoDB Models, Auth, Attendance APIs, Final Testing ].
* Name - [ Suraj Aghav ], Role - [ Frontend Developer ], Responsibilities - [ React UI, BootStrap Styling, Routing, Axios Integration ].
* Name - [ Soham Pawar ], Role - [ Full Stack Developer ], Responsibilities - [ Backend-Frontend Integration, SMS Integration, Documentation ].

## 📧 Contact
For inquiries: @gmail.com

## Coming Soon
