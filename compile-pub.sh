#!/bin/bash
cd ./packages
cd ./fuzzy-next
sudo pnpm run pub
cd ../layout-provider
sudo pnpm run pub
cd ../request-provider
sudo pnpm run pub
cd ../request-provider
sudo pnpm run pub
cd ../ui-renderer
sudo pnpm run pub