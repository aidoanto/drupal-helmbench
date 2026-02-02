#!/bin/bash

# Database Restore Script for Drupal Helmbench
# Restores a database backup with safety checks

set -e

BACKUP_DIR="/app/backups"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}📥 Database Restore${NC}"
echo ""

# Check if backups exist
if ! ls "$BACKUP_DIR"/helmbench-*.sql.gz >/dev/null 2>&1; then
    echo -e "${RED}❌ No backups found in $BACKUP_DIR${NC}"
    echo -e "   Run 'lando backup' to create a backup first."
    exit 1
fi

# List available backups
echo -e "${YELLOW}Available backups:${NC}"
select BACKUP_FILE in $(ls -t "$BACKUP_DIR"/helmbench-*.sql.gz); do
    if [ -n "$BACKUP_FILE" ]; then
        break
    else
        echo -e "${RED}Invalid selection. Please try again.${NC}"
    fi
done

echo ""
echo -e "${YELLOW}⚠️  WARNING: This will replace your current database!${NC}"
echo -e "Selected backup: $(basename "$BACKUP_FILE")"
echo -e "Size: $(du -h "$BACKUP_FILE" | cut -f1)"
echo ""
read -p "Are you sure you want to restore this backup? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${YELLOW}Restore cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${YELLOW}🔄 Restoring database...${NC}"

# Drop and recreate the database, then import
if gunzip < "$BACKUP_FILE" | drush sql:cli 2>&1; then
    echo -e "${GREEN}✅ Database restored successfully!${NC}"
    echo -e "${YELLOW}🔄 Rebuilding cache...${NC}"
    drush cr
    echo -e "${GREEN}✅ Cache rebuild complete!${NC}"
    exit 0
else
    echo -e "${RED}❌ Restore failed${NC}"
    exit 1
fi
