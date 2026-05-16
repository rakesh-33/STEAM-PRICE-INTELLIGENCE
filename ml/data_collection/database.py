import pandas as pd
from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.exc import SQLAlchemyError

DB_USER = "root"
DB_PASSWORD = ""
DB_HOST = "localhost"
DB_PORT = 3306
DB_NAME = "steam_price_intelligence"
TABLE_NAME = "game_deals"


def get_database_url() -> str:
    return f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


def create_database_engine() -> Engine:
    return create_engine(get_database_url(), echo=False, pool_pre_ping=True)


engine = create_database_engine()


def test_database_connection() -> bool:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        print("[DB] Connected")
        return True
    except SQLAlchemyError as error:
        print(f"[ERROR] Database connection failed: {error}")
        return False


def save_to_mysql(df: pd.DataFrame) -> bool:
    if df.empty:
        print("[ERROR] DataFrame is empty. No rows saved.")
        return False
    try:
        df.to_sql(name=TABLE_NAME, con=engine, if_exists="append", index=False)
        print(f"[DB] Saved rows: {len(df)}")
        return True
    except SQLAlchemyError as error:
        print(f"[ERROR] Failed to save data to MySQL: {error}")
        return False


def main() -> None:
    test_database_connection()


if __name__ == "__main__":
    main()