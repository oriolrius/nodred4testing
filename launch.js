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

// Node-RED settings - based on settings.js.basic
const settings = {
    // Flow file configuration
    flowFile: 'flows.json',
    flowFilePretty: true,
    
    // User directory
    userDir: tempDir,
    
    // Server configuration
    uiPort: process.env.PORT || 1880,
    httpAdminRoot: '/',
    httpNodeRoot: '/api',
    
    // CORS settings for HTTP admin interface
    httpAdminCors: {
        origin: "*",
        credentials: true
    },
    
    // CORS settings for HTTP nodes
    httpNodeCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE"
    },
    
    // Authentication disabled (commented out like in settings.js.basic)
    // adminAuth: false,
    // httpAdminAuth: false,
    // httpNodeAuth: false,
    
    // Runtime state - IMPORTANT: This controls flow deployment
    runtimeState: {
        enabled: false,  // This should be false for normal operation
        ui: false        // This should be false for normal operation
    },
    
    // Diagnostics
    diagnostics: {
        enabled: true,
        ui: true
    },
    
    // Logging configuration
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    },
    
    // Editor theme configuration
    editorTheme: {
        tours: false,
        projects: {
            enabled: false,
            workflow: {
                mode: "manual"
            }
        },
        palette: {
            editable: true
        },
        codeEditor: {
            lib: "monaco"
        },
        markdownEditor: {
            mermaid: {
                enabled: true
            }
        },
        multiplayer: {
            enabled: false
        },
        header: {
            title: "Node-RED Launcher",
            url: "about:blank"
        }
    },
    
    // Function node configuration
    functionExternalModules: true,
    functionTimeout: 0,
    functionGlobalContext: {
        // Add any global context variables here
    },
    
    // Export global context keys
    exportGlobalContextKeys: false,
    
    // External modules configuration
    externalModules: {
        // palette: {
        //     allowInstall: true,
        //     allowUpdate: true,
        //     allowUpload: true
        // }
    },
    
    // Debug configuration
    debugMaxLength: 1000,
    
    // Connection timeouts
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000
};

console.log(`📁 Using Node-RED directory: ${tempDir}`);
console.log('⚙️  Configuration: No authentication, flows deployable');
console.log('');

// Initialize Node-RED
RED.init(server, settings);

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
