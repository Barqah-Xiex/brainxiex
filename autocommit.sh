#!/bin/bash

set -e

REPO_DIR="$(pwd)"

echo "📦 Bump version..."
npm version patch --no-git-tag-version

# Set remote

git remote set-url origin https://github.com/Barqah-Xiex/brainxiex.git

cd "$REPO_DIR" || exit 1

echo "🔄 Fetch latest..."
git fetch origin main

echo "📂 Add changes..."
git add .

# Commit kalau ada perubahan

if [ -n "$(git status --porcelain)" ]; then
echo "📝 Commit..."
if [ $# -eq 0 ]; then
git commit -m "Auto commit on $(date +'%Y-%m-%d %H:%M:%S')"
else
git commit -m "$*"
fi

echo "⬆️ Push..."
git push origin main
else
echo "⚠️ Tidak ada perubahan"
fi

# ===== INPUT TOKEN =====

echo ""
read -s "🔐 Masukkan NPM Token: " NPM_TOKEN
echo ""

if [ -z "$NPM_TOKEN" ]; then
echo "❌ Token kosong, abort."
exit 1
fi

# Set token ke npm (temporary)

npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN

# ===== PUBLISH =====

PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo "📦 Cek versi di npm..."
if npm view "$PACKAGE_NAME@$PACKAGE_VERSION" > /dev/null 2>&1; then
echo "⚠️ Version $PACKAGE_VERSION sudah ada, skip publish"
exit 0
fi

echo "🚀 Publish..."
npm publish --access public

echo "✅ Done!"
