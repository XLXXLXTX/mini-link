import os
import libsql_experimental as libsql
from dotenv import load_dotenv
from pathlib import Path

from datetime import datetime
import pytz

# load env vars
dotenv_path = Path('../server/.env')
load_dotenv(dotenv_path=dotenv_path)

# get env vars
url = os.getenv("TURSO_DATABASE_URL")
auth_token = os.getenv("TURSO_AUTH_TOKEN")
local_db = os.getenv("LOCAL_DB_PATH")

# connect to the database
conn = libsql.connect(database=local_db, sync_url=url, auth_token=auth_token)
conn.sync()

# task
print('-------------------')
tz = pytz.timezone('Europe/Madrid')
dt = datetime.now(tz)

print(f'Expired links at {dt.strftime("%d/%m/%Y %H:%M:%S")}:')

cursor = conn.execute("SELECT apiKey FROM keys WHERE expires_at < DATETIME('now');")
for key in cursor.fetchall():
    print(f'- {key[0]}')

print(f'Deleting ...')

conn.execute("PRAGMA foreign_keys = ON;")
cursor = conn.execute("DELETE FROM keys WHERE expires_at < DATETIME('now');")
conn.commit()

conn.sync()

print(f'Deleted {cursor.rowcount} expired keys!')
print('-------------------')
