# 🌐 CogniSphere

**AI-Powered Skill Swap & Learning Platform**

CogniSphere is a Generative-AI powered web platform that enables students to **exchange skills instead of money**. Users earn credits by teaching skills they know and spend those credits to learn new skills, enhanced with **AI-generated multimodal learning content**.

> *“I teach Python → I earn credits → I learn UI/UX”*

---

## 🚀 Problem Statement

* Quality online courses are expensive for students
* Peer knowledge remains largely underutilized
* Learning platforms lack personalization and adaptability
* No structured system exists for fair skill exchange

---

## 💡 Solution

**CogniSphere** introduces a **skill-for-skill learning economy** powered by **Google Gemini AI**, enabling:

* Peer-to-peer skill exchange without money
* Credit-based learning incentives
* AI-driven personalized education
* Multimodal learning (text, code, audio & visual)

---

## ✨ Key Features (Hackathon MVP)

### 👤 User Profiles

* Skills you can teach
* Skills you want to learn
* Credit balance & rating

### 🔁 Skill Swap & Matching

* Smart matching based on skill demand & availability
* Easy skill exchange requests

### 💳 Credit System

* Teach a session → earn credits
* Learn a skill → spend credits

### 🤖 AI-Powered Learning (Gemini)

For any skill, AI generates:

1. **Text Explanation** – simple, beginner-friendly
2. **Code Explanation** – real examples with comments
3. **Audio + Visual Learning**

   * Audio narration script
   * Visual explanation (flows, diagrams, steps)

### 📊 AI Evaluation & Feedback

* Post-session summary evaluation
* Understanding score (1–10)
* Actionable improvement tips

---

## 🧠 Tech Stack

| Layer       | Technology                |
| ----------- | ------------------------- |
| Frontend    | HTML, CSS, JavaScript     |
| Backend     | Flask (Python)            |
| AI Engine   | Google Gemini API         |
| Storage     | In-memory (Hackathon MVP) |
| Environment | Python, Virtualenv        |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/cognisphere.git
cd cognisphere
```

### 2️⃣ Create Virtual Environment (Recommended)

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Set Gemini API Key

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> ⚠️ Never commit `.env` to GitHub

---

## ▶️ Run the Application

```bash
python app.py
```

Visit:

```
http://localhost:5000
```

---

## 🔗 API Endpoints

| Endpoint               | Method | Description                  |
| ---------------------- | ------ | ---------------------------- |
| `/api/register`        | POST   | Register new user            |
| `/api/match/<user_id>` | GET    | Get skill matches            |
| `/api/learn`           | POST   | Generate AI learning content |
| `/api/teach/<user_id>` | POST   | Earn credits by teaching     |
| `/api/user/<user_id>`  | GET    | Fetch user profile           |

---

## 🎯 Hackathon Value Proposition

* ✅ Solves a **real student problem**
* 🤖 Meaningful use of **Generative AI**
* 🔄 Unique **skill-based economy**
* ⚡ Fast, demo-ready MVP
* 📈 Highly scalable for real-world use

---



## 🏆 Team

Built with ❤️ for hackathons & innovation.
**Project:** CogniSphere

---
