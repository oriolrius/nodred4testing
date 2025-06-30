# Node-RED Launcher

A simple Node-RED launcher that programmatically starts Node-RED using the Node-RED library with authentication disabled for easy development and testing.

## 🚀 Features

- **Quick Start**: Launch Node-RED with a single command
- **No Authentication**: Authentication completely disabled for development ease
- **Temporary Storage**: Uses temporary directory for flows and user data
- **Auto Cleanup**: Automatically cleans up temporary files on shutdown
- **CORS Enabled**: Cross-origin requests allowed for API testing
- **Express Integration**: Built on Express.js with HTTP server
- **Graceful Shutdown**: Handles process termination cleanly

## 📋 Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Clone or download this project
2. Install dependencies:

```bash
npm install
```

## 🎯 Usage

### Start Node-RED

```bash
npm start
```

Or for quiet mode (suppresses deprecation warnings):

```bash
npm run start:quiet
```

### Access the Editor

Once started, open your browser to:
- **Editor UI**: http://localhost:1880
- **API Endpoints**: http://localhost:1880/api

### Stop Node-RED

Press `Ctrl+C` in the terminal to stop the server. The application will:
- Gracefully stop Node-RED runtime
- Clean up temporary files
- Exit cleanly

## ⚙️ Configuration

The launcher uses the following default settings:

- **Port**: 1880 (configurable via `PORT` environment variable)
- **Admin Root**: `/` (editor interface)
- **HTTP Node Root**: `/api` (flow endpoints)
- **User Directory**: `./tmp` (temporary directory)
- **Flow File**: `flows.json`

### Environment Variables

- `PORT`: Override the default port (default: 1880)

Example:
```bash
PORT=3000 npm start
```

## 📁 Project Structure

```
├── launch.js          # Main launcher script
├── package.json       # Project dependencies and scripts
├── tmp/              # Temporary directory (auto-created)
│   └── flows.json    # Node-RED flows (auto-created)
└── README.md         # This file
```

## 🔧 Key Features Explained

### Authentication Disabled
All authentication mechanisms are disabled including:
- Admin authentication
- HTTP node authentication
- User sessions
- Credential encryption
- Login dialogs

### CORS Support
Cross-Origin Resource Sharing (CORS) is enabled with:
- Origin: `*` (all origins allowed)
- Credentials: `true`

### Error Handling
The launcher includes comprehensive error handling for:
- Uncaught exceptions
- Unhandled promise rejections
- Graceful shutdown on SIGINT/SIGTERM

### Temporary Storage
- Creates a `tmp` directory for Node-RED user data
- Initializes empty flows.json if not present
- Cleans up temporary files on shutdown

## 🔍 Troubleshooting

### Port Already in Use
If port 1880 is already in use, either:
1. Stop the service using that port, or
2. Use a different port: `PORT=3001 npm start`

### Permission Issues
Ensure the application has write permissions to create the `tmp` directory in the project folder.

### Node-RED Won't Start
Check the console output for specific error messages. Common issues:
- Missing dependencies (run `npm install`)
- Port conflicts
- File system permissions

## 📦 Dependencies

- **node-red**: ^4.0.2 - The Node-RED runtime
- **express**: ^4.19.0 - Web application framework

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License.

## ⚠️ Important Notes

- This launcher is designed for development and testing purposes
- Authentication is completely disabled - **do not use in production**
- Temporary files are cleaned up on shutdown but may persist if the process is killed forcefully
- The launcher creates flows and user data in a temporary directory that gets deleted on clean shutdown

## 🆘 Support

For Node-RED specific questions, refer to the [official Node-RED documentation](https://nodered.org/docs/).

For issues with this launcher, please check the console output for error messages and ensure all dependencies are properly installed.
