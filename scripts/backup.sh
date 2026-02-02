#!/bin/bash

# Database Backup Script for Drupal Helmbench
# Automatically backs up the database with timestamps and manages rotation

set -e

# Configuration
BACKUP_DIR="/app/backups"
BACKUP_NAME="helmbench-$(date +%Y%m%d-%H%M%S).sql"
MAX_BACKUPS=10  # Keep last 10 backups

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔄 Starting database backup...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create the backup
if drush sql:dump --gzip --result-file="$BACKUP_DIR/$BACKUP_NAME" 2>&1; then
    # Get actual filename (Drush adds .gz if not already present)
    ACTUAL_FILE=$(ls -t "$BACKUP_DIR"/helmbench-*.sql.gz 2>/dev/null | head -1)
    
    if [ -f "$ACTUAL_FILE" ]; then
        SIZE=$(du -h "$ACTUAL_FILE" | cut -f1)
        echo -e "${GREEN}✅ Backup created successfully!${NC}"
        echo -e "   File: $(basename "$ACTUAL_FILE")"
        echo -e "   Size: $SIZE"
        echo -e "   Location: $BACKUP_DIR"
        
        # Rotation: Keep only the last MAX_BACKUPS files
        BACKUP_COUNT=$(ls -1 "$BACKUP_DIR"/helmbench-*.sql.gz 2>/dev/null | wc -l)
        if [ "$BACKUP_COUNT" -gt "$MAX_BACKUPS" ]; then
            echo -e "${YELLOW}🗑️  Rotating old backups (keeping last $MAX_BACKUPS)...${NC}"
            ls -t "$BACKUP_DIR"/helmbench-*.sql.gz | tail -n +$((MAX_BACKUPS + 1)) | xargs rm -f
            echo -e "${GREEN}✅ Rotation complete${NC}"
        fi
        
        # List all current backups
        echo -e "\n${YELLOW}📦 Current backups:${NC}"
        ls -lh "$BACKUP_DIR"/helmbench-*.sql.gz 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
        
        exit 0
    else
        echo -e "${RED}❌ Backup file was not created${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Backup failed${NC}"
    exit 1
fi
