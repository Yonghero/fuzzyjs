#!/bin/bash
cd ./packages
cd ./fuzzy-next
pnpm run pub
cd ../layout-provider
pnpm run pub
cd ../request-provider
pnpm run pub
cd ../request-provider
pnpm run pub
cd ../ui-renderer
pnpm run pub