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

![Main Dashboard 1](https://github.com/user-attachments/assets/79cae93c-01cf-4f8e-9993-8fa9eb7870bf)


* **Landing Page**

![Landing page 2](https://github.com/user-attachments/assets/d5023e01-2017-44d9-adb0-0599bdf3d84c)


* **Admin Login**

![Admin Login Page 3](https://github.com/user-attachments/assets/20194a25-425b-47a5-b0fa-233959737d5f)


* **Attender Login**

![Attender Login Page 4](https://github.com/user-attachments/assets/19e5a98f-7a4d-400e-b4b6-1668e222485b)


* **Admin Dashboard**

![Admin Dashboard 3-1](https://github.com/user-attachments/assets/ba000c5c-f84f-4a25-a003-ae10456b9059)


* **Admin Attender Register Dashboard**

![Attender Register 3-2](https://github.com/user-attachments/assets/3ac596fe-21ef-4470-9966-396071fb3312)


* **Admin Driver Register Dashboard**

![Driver Register 3-3](https://github.com/user-attachments/assets/4da7f77f-0473-4cd5-bcd1-0006fecc0034)


* **Admin Bus Register Dashboard**

![Bus Register 3-4](https://github.com/user-attachments/assets/675cf4b8-ea98-46c7-a153-ead76561bbd8)


* **Admin Student Register Dashboard**

![Student Register 3-5](https://github.com/user-attachments/assets/f6681e91-3c0c-4ce7-a9fa-5b91c507dc26)


* **Attender Dashboard**

![Attendance Dashboard 4-1](https://github.com/user-attachments/assets/6c01503a-55dc-42ee-9139-5e49238ac0d9)


* **Attender Mark Dashboard**

![Attendance Dashboard Mark 4-2](https://github.com/user-attachments/assets/1ae33135-6e6e-4f43-9196-464f73a8781c)


* **Attender View Dashboard**

![Attendance Dashboard Record 4-3](https://github.com/user-attachments/assets/8f018d02-c710-416f-a0eb-d93eaff818c6)



## 👨‍👩‍👧‍👦 Team Members
* Name - [ Dipali Wable ], Role - [ Backend Developer ], Responsibilities - [ Express.js APIs, MongoDB Models, Auth, Attendance APIs, Final Testing ].
* Name - [ Suraj Aghav ], Role - [ Frontend Developer ], Responsibilities - [ React UI, BootStrap Styling, Routing, Axios Integration ].
* Name - [ Soham Pawar ], Role - [ Full Stack Developer ], Responsibilities - [ Backend-Frontend Integration, SMS Integration, Documentation ].

## 📧 Contact
For inquiries: @gmail.com

## Coming Soon
