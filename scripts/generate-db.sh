#!/bin/bash

SQL_SCRIPT_FILE="mini-link.sql"
DB_FILE="mini-link-local.db"

if [ ! -f "$SQL_SCRIPT_FILE" ]; then
  echo "Error: SQL file '$SQL_SCRIPT_FILE' not found in the current directory."
  exit 1
fi

if ! command -v sqlite3 &> /dev/null; then
  echo "Error: sqlite3 is not installed. Please install it and try again."
  exit 1
fi

echo "Executing SQL script '$SQL_SCRIPT_FILE' on database '$DB_FILE'..."
if sqlite3 "$DB_FILE" < "$SQL_SCRIPT_FILE"; then
  echo "SQL script executed successfully."
else
  echo "Error: Failed to execute SQL script."
  exit 1
fi
