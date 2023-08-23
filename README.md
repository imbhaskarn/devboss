# DevBoss Blog Project

Welcome to the DevBoss Blog Project! This project is a simple blogging platform where users can create, edit, and share their blog posts.

![Screenshot](./screenshots/screenshot.png)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, edit, and delete blog posts.
- Categorize posts with tags for easy navigation.
- Responsive design for a seamless experience on all devices.
- User authentication to secure your blog posts.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- You have Node.js and pnpm installed.
- You have a database (PostgreSQL) up and running.

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/imbhaskarn/devboss.git
   cd devboss
   npm install
   ```

2. Create a .env file in the project root and provide the necessary environment variables:
   pnpm run migrate:dev

3. Start the development server:

```
npm run dev
```
