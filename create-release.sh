#!/bin/bash

# Node-RED Launcher Release Script v1.1.0
# This script creates the release v1.1.0

echo "🚀 Creating Node-RED Launcher Release v1.1.0"
echo "=============================================="

# Initialize git if not already done
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    git config user.name "Node-RED Launcher"
    git config user.email "launcher@nodered.local"
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "🚀 Release v1.1.0: Fixed flow deployment and improved Node-RED configuration

✨ Key Improvements:
- FIXED: Flow deployment now works correctly
- FIXED: Runtime state configuration for proper operation  
- ADDED: Complete Node-RED configuration based on official settings.js.basic
- ADDED: Monaco editor, Mermaid, and external modules support
- IMPROVED: Better error handling and logging

🐛 Bug Fixes:
- Removed conflicting authentication middleware
- Corrected runtimeState.enabled setting (now false for normal operation)
- Aligned all settings with Node-RED best practices

📝 Documentation:
- Added comprehensive CHANGELOG.md with all changes
- Updated package.json to v1.1.0"

# Create tag
echo "🏷️  Creating tag v1.1.0..."
git tag -a v1.1.0 -m "Release v1.1.0 - Fixed Flow Deployment

🎉 Major improvements to Node-RED launcher

✅ MAIN FIX: Flow deployment now works correctly
✅ Proper Node-RED configuration based on official settings
✅ Monaco editor and enhanced features support  
✅ Better error handling and diagnostics

This release fixes the critical issue where flows couldn't be deployed and provides a complete, production-ready Node-RED launcher configuration."

echo "✅ Release v1.1.0 created successfully!"
echo ""
echo "📋 Next steps (if you have a remote repository):"
echo "   git remote add origin <your-repo-url>"
echo "   git push origin main"
echo "   git push origin v1.1.0"
echo ""
echo "🔗 Or if you have GitHub CLI installed:"
echo "   gh release create v1.1.0 --title 'Release v1.1.0 - Fixed Flow Deployment' --notes-file CHANGELOG.md"
echo ""
echo "🎯 Summary of v1.1.0:"
echo "   - Fixed flow deployment functionality"
echo "   - Improved Node-RED configuration"
echo "   - Better error handling and logging"
echo "   - Added comprehensive documentation"
