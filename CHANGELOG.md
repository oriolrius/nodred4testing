# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-06-30

### Added

- Complete Node-RED configuration based on official settings.js.basic
- Proper CORS configuration for both admin and node HTTP interfaces
- Enhanced diagnostics support
- Monaco editor configuration
- Mermaid markdown support
- External modules support for Function nodes
- Comprehensive error handling and graceful shutdown
- Better logging configuration

### Fixed

- **BREAKING**: Fixed flow deployment functionality - flows can now be deployed successfully
- Fixed runtime state configuration (disabled runtimeState.enabled for normal operation)
- Removed conflicting authentication middleware that was blocking normal operation
- Aligned configuration with Node-RED best practices

### Changed

- Improved settings configuration to match official Node-RED settings.js.basic
- Enhanced console output with better status messages
- Updated editor theme configuration
- Simplified authentication handling (properly disabled)

### Technical Details

- Runtime state now correctly set to `enabled: false` for normal flow deployment
- Removed custom middleware that was interfering with Node-RED's internal routing
- Added comprehensive Node-RED settings following official documentation
- Improved error handling for startup and shutdown processes

## [1.0.0] - 2025-06-30

### Initial Release

- Initial Node-RED launcher implementation
- Basic Express server setup
- Temporary directory management
- Simple flow deployment capabilities
- Basic authentication disabled setup
