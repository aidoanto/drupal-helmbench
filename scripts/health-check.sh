#!/bin/bash

# Database Health Check Script for Drupal Helmbench
# Verifies database connectivity and detects potential zombie container issues

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏥 Database Health Check${NC}"
echo ""

# Check 1: Database connection
echo -e "${YELLOW}Checking database connection...${NC}"
if drush sql:query "SELECT 1" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    exit 1
fi

# Check 2: Get last watchdog entry timestamp
echo ""
echo -e "${YELLOW}Checking database activity...${NC}"
LAST_ACTIVITY=$(drush sql:query "SELECT MAX(timestamp) FROM watchdog" 2>/dev/null | tail -1)

if [ -z "$LAST_ACTIVITY" ] || [ "$LAST_ACTIVITY" = "NULL" ]; then
    echo -e "${YELLOW}⚠️  No watchdog entries found (fresh database)${NC}"
else
    LAST_DATE=$(date -d @"$LAST_ACTIVITY" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || echo "Unknown")
    CURRENT_TIME=$(date +%s)
    AGE_SECONDS=$((CURRENT_TIME - LAST_ACTIVITY))
    AGE_HOURS=$((AGE_SECONDS / 3600))
    
    echo -e "   Last database activity: ${BLUE}$LAST_DATE${NC}"
    echo -e "   Activity age: ${BLUE}$AGE_HOURS hours${NC}"
    
    # Warn if last activity is more than 24 hours old
    if [ "$AGE_HOURS" -gt 24 ]; then
        echo -e "${RED}⚠️  WARNING: Database activity is more than 24 hours old!${NC}"
        echo -e "   If you've been using the site recently, you may have a zombie container issue."
        echo -e "   Consider running 'lando restart' to ensure proper container connectivity."
    else
        echo -e "${GREEN}✅ Database activity is recent${NC}"
    fi
fi

# Check 3: Count content nodes
echo ""
echo -e "${YELLOW}Checking content...${NC}"
NODE_COUNT=$(drush sql:query "SELECT COUNT(*) FROM node" 2>/dev/null | tail -1)
echo -e "   Nodes: ${BLUE}$NODE_COUNT${NC}"

# Check 4: Count users
USER_COUNT=$(drush sql:query "SELECT COUNT(*) FROM users_field_data WHERE uid > 0" 2>/dev/null | tail -1)
echo -e "   Users: ${BLUE}$USER_COUNT${NC}"

# Check 5: Drupal status
echo ""
echo -e "${YELLOW}Drupal status:${NC}"
drush status --fields=drupal-version,db-status,bootstrap 2>/dev/null | sed 's/^/   /'

# Check 6: Docker volume verification
echo ""
echo -e "${YELLOW}Checking Docker volumes...${NC}"
echo -e "   Container: $(hostname)"

# Summary
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}Health check complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
