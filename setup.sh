#!/bin/bash

echo "🚀 Setting up Job Seeker App..."
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
  echo "⚠️  This script is designed for macOS. For other platforms, please follow the manual setup instructions."
  exit 1
fi

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# iOS Setup
echo ""
echo "🍎 Setting up iOS..."
cd ios

# Install Ruby bundler if not already installed
if ! command -v bundle &> /dev/null; then
  echo "Installing bundler..."
  gem install bundler
fi

# Install Ruby dependencies
echo "Installing Ruby dependencies..."
bundle install

# Install CocoaPods dependencies
echo "Installing CocoaPods dependencies..."
bundle exec pod install

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo ""
echo "  iOS:     npm run ios"
echo "  Android: npm run android"
echo ""
echo "⚠️  Important: Make sure your backend is running at http://localhost:3000"
echo ""
echo "📝 For more information, see README_SETUP.md"
