#!/usr/bin/env node

// Launch Node-RED using the Node-RED library
console.log('🚀 Launching Node-RED');
console.log('====================');
console.log('');

const http = require('http');
const express = require('express');
const RED = require('node-red');
const path = require('path');
const fs = require('fs');

// Create Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create temporary directory for Node-RED user data
const tempDir = path.join('./', 'tmp');
const flowFile = path.join(tempDir, 'flows.json');

// Ensure temp directory exists
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Create empty flows file if it doesn't exist
if (!fs.existsSync(flowFile)) {
    const emptyFlow = [];
    fs.writeFileSync(flowFile, JSON.stringify(emptyFlow, null, 2));
}

// Node-RED settings
const settings = {
    httpAdminRoot: '/',
    httpNodeRoot: '/api',
    userDir: tempDir,
    flowFile: 'flows.json',
    
    // CORS settings
    httpAdminCors: {
        origin: "*",
        credentials: true
    },
    
    // Authentication disabled for simplicity
    adminAuth: false,
    httpAdminAuth: false,
    httpNodeAuth: false,
    
    // Additional settings to prevent login dialogs
    requireAuth: false,
    credentialSecret: false, // Disable credential encryption
    
    // Disable authentication checks
    httpStatic: false,
    httpStaticAuth: false,
    
    // Disable session management that might trigger login
    sessionSecret: false,
    sessionTimeout: false,
    
    // Explicitly disable all authentication mechanisms
    disableAuth: true,
    
    // Logging configuration
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    
    // Editor theme
    editorTheme: {
        projects: {
            enabled: false
        },
        header: {
            title: "Node-RED Launcher",
            url: "about:blank"
        },
        login: {
            image: false // Disable login page image
        },
        userMenu: false, // Disable user menu completely
        menu: {
            "menu-item-user-settings": false, // Hide user settings
            "menu-item-keyboard-shortcuts": false, // Hide keyboard shortcuts that might show login
            "menu-item-help": false, // Hide help menu
            "menu-item-node-red-version": false // Hide version info
        },
        tours: false, // Disable tours that might trigger dialogs
        palette: {
            editable: true
        }
    },
    
    // Function settings
    functionGlobalContext: {
        // Add any global context variables here
    }
};

console.log(`📁 Using Node-RED directory: ${tempDir}`);
console.log('');

// Initialize Node-RED
RED.init(server, settings);

// Add middleware to bypass authentication completely
app.use((req, res, next) => {
    // Skip authentication for all admin routes
    if (req.path.startsWith('/auth/') || req.path.includes('login')) {
        return res.status(404).send('Authentication disabled');
    }
    next();
});

// Serve the editor UI from /
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Serve the http nodes from /api
app.use(settings.httpNodeRoot, RED.httpNode);

// Start the server
const PORT = process.env.PORT || 1880;

server.listen(PORT, async () => {
    console.log('� Starting Node-RED...');
    
    try {
        // Start Node-RED runtime
        await RED.start();
        
        console.log('✅ Node-RED started successfully!');
        console.log('📖 Open your browser to: http://localhost:' + PORT);
        console.log('🛑 To stop: Press Ctrl+C');
        console.log('');
        
    } catch (error) {
        console.error('❌ Failed to start Node-RED:', error.message);
        process.exit(1);
    }
});

// Graceful shutdown
async function shutdown() {
    console.log('\n\n🛑 Stopping Node-RED...');
    
    try {
        await RED.stop();
        console.log('✅ Node-RED stopped gracefully');
        
        // Cleanup temp directory
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
            console.log('🧹 Cleaned up temporary files');
        } catch (error) {
            console.log('⚠️  Could not clean up temporary files:', error.message);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error stopping Node-RED:', error.message);
        process.exit(1);
    }
}

// Handle process termination
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error.message);
    shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    shutdown();
});
