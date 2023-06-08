#!/bin/bash
cd ./packages
cd ./fuzzy-next
pnpm run build
cd ../layout-provider
pnpm run build
cd ../request-provider
pnpm run build
cd ../request-provider
pnpm run build
cd ../ui-renderer
pnpm run build