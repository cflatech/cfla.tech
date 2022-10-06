#!/bin/sh

set -eux

sudo chown devuser:devusers ./node_modules
sudo chown devuser:devusers ./backend/node_modules
sudo chown devuser:devusers ./frontend/node_modules
