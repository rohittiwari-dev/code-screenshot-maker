# CodeShare 📸

CodeShare is a beautiful, modern web application for creating stunning code screenshots. Transform your code snippets into visually appealing images with customizable themes, fonts, and styling options.

## ✨ Features

-   **Beautiful Code Highlighting**: Syntax highlighting for multiple programming languages
-   **Customizable Themes**: Choose from various color themes to match your style
-   **Font Options**: Multiple font choices for the perfect look
-   **Adjustable Padding**: Control the spacing around your code
-   **Background Options**: Toggle between transparent and themed backgrounds
-   **Dark/Light Modes**: Support for both dark and light interfaces
-   **Auto Language Detection**: Automatically detect programming languages
-   **Export Options**: Generate high-quality images of your code
-   **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) (recommended) or Node.js 18+
-   A Neon Database account (for database features)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/codeshare.git
cd codeshare
```

2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Fill in the required environment variables in `.env`

4. Set up the database:

```bash
bun run db:push
```

5. Start the development server:

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15](https://nextjs.org/) with App Router
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [Drizzle ORM](https://orm.drizzle.team/) with [Neon Database](https://neon.tech/)
-   **UI Components**: [Radix UI](https://www.radix-ui.com/) with [shadcn/ui](https://ui.shadcn.com/)
-   **Code Editor**: [react-simple-code-editor](https://github.com/react-simple-code-editor/react-simple-code-editor)
-   **Syntax Highlighting**: [highlight.js](https://highlightjs.org/)
-   **Image Generation**: [html-to-image](https://github.com/bubkoo/html-to-image)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **Runtime**: [Bun](https://bun.sh/)

## 📝 Available Scripts

```bash
# Development
bun dev                 # Start development server
bun build              # Build for production
bun start              # Start production server

# Database
bun run db:generate    # Generate database migrations
bun run db:migrate     # Run database migrations
bun run db:push        # Push schema changes to database
bun run db:studio      # Open Drizzle Studio

# Code Quality
bun lint               # Run ESLint
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

For security issues, please see our [Security Policy](SECURITY.md).
