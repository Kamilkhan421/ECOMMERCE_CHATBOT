import pandas as pd
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    dbname=os.getenv("DB_NAME")
)
cur = conn.cursor()

def load_csv_to_table(file_path, table_name):
    df = pd.read_csv(file_path)
    for _, row in df.iterrows():
        cols = ','.join(df.columns)
        placeholders = ','.join(['%s'] * len(df.columns))
        sql = f"INSERT INTO {table_name} ({cols}) VALUES ({placeholders})"
        try:
            cur.execute(sql, tuple(row))
        except Exception as e:
            print(f"Error inserting row into {table_name}: {e}")

data_files = {
    "distribution_centers": "data/distribution_centers.csv",
    "products": "data/products.csv",
    "inventory_items": "data/inventory_items.csv",
    "users": "data/users.csv",
    "orders": "data/orders.csv",
    "order_items": "data/order_items.csv"
}

for table, path in data_files.items():
    print(f"Loading {table}...")
    load_csv_to_table(path, table)

conn.commit()
cur.close()
conn.close()
print("✅ Data load complete.")
