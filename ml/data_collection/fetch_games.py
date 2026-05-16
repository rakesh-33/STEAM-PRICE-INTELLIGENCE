"""
=============================================================================
Steam Price Intelligence Platform
File: fetch_games.py
Location: ml/data_collection/fetch_games.py

Description:
    Fetches game deal data from the CheapShark API, cleans it into a
    structured Pandas DataFrame, and prints a preview. This module is
    designed to be the first step in the data pipeline — later it will
    hand off data to MySQL storage via SQLAlchemy.

API Reference:
    https://apidocs.cheapshark.com/

Author:   [Your Name]
Created:  2025
=============================================================================
"""

import requests
import pandas as pd
import sys


# Constants

API_URL = "https://www.cheapshark.com/api/1.0/deals"

# Columns we care about from the raw API response
USEFUL_COLUMNS = [
    "title",
    "salePrice",
    "normalPrice",
    "savings",
    "steamAppID",
    "dealRating",
    "storeID",
    "dealID",
    "thumb",
    "lastChange",
]

# How many deals to fetch per request (max allowed by CheapShark: 60)
PAGE_SIZE = 60


# Data Fetching

def fetch_raw_deals(page_size: int = PAGE_SIZE) -> list[dict]:
    """
    Fetch raw deal data from the CheapShark API.

    Args:
        page_size: Number of deals to retrieve (max 60).

    Returns:
        A list of deal dictionaries from the API.

    Raises:
        SystemExit: If the API request fails.
    """
    params = {"pageSize": page_size}

    print(f"[INFO] Fetching {page_size} deals from CheapShark API...")

    try:
        response = requests.get(API_URL, params=params, timeout=10)
        response.raise_for_status()  # Raises an error for 4xx / 5xx responses
    except requests.exceptions.ConnectionError:
        print("[ERROR] Could not connect to the CheapShark API. Check your internet connection.")
        sys.exit(1)
    except requests.exceptions.Timeout:
        print("[ERROR] The request timed out. The API may be slow or unreachable.")
        sys.exit(1)
    except requests.exceptions.HTTPError as e:
        print(f"[ERROR] HTTP error received: {e}")
        sys.exit(1)
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] An unexpected error occurred: {e}")
        sys.exit(1)

    deals = response.json()
    print(f"[INFO] Successfully fetched {len(deals)} deals.")
    return deals

# Data Processing

def build_dataframe(raw_deals: list[dict]) -> pd.DataFrame:
    """
    Convert raw API deal data into a clean, typed Pandas DataFrame.

    Args:
        raw_deals: List of deal dictionaries from the API.

    Returns:
        A cleaned and typed Pandas DataFrame.
    """
    # Create the full DataFrame from the raw JSON
    df_raw = pd.DataFrame(raw_deals)

    # Keep only the columns we actually need (ignore missing ones gracefully)
    cols_present = [col for col in USEFUL_COLUMNS if col in df_raw.columns]
    df = df_raw[cols_present].copy()

    # --- Type Conversions ---
    # Prices and savings come back as strings from the API, cast to float
    for col in ["salePrice", "normalPrice", "savings", "dealRating"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # steamAppID can be empty strings for non-Steam stores — replace with None
    if "steamAppID" in df.columns:
        df["steamAppID"] = df["steamAppID"].replace("", None)

    # --- Derived Columns ---
    # Handy discount amount column (saves a calculation later)
    if "normalPrice" in df.columns and "salePrice" in df.columns:
        df["discountAmount"] = (df["normalPrice"] - df["salePrice"]).round(2)

    print(f"[INFO] DataFrame built with {len(df)} rows and {len(df.columns)} columns.")
    return df


def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """
    Apply light cleaning rules to the DataFrame.

    Args:
        df: Raw typed DataFrame from build_dataframe().

    Returns:
        Cleaned DataFrame ready for analysis or database insertion.
    """
    # Drop rows where the game title is missing (shouldn't happen, but safety first)
    df = df.dropna(subset=["title"])

    # Drop duplicate deals (same dealID)
    if "dealID" in df.columns:
        df = df.drop_duplicates(subset=["dealID"])

    # Reset the index so it stays tidy after drops
    df = df.reset_index(drop=True)

    print(f"[INFO] After cleaning: {len(df)} rows remaining.")
    return df


# Display

def preview_data(df: pd.DataFrame, n: int = 5) -> None:
    """
    Print a formatted preview of the DataFrame to the console.

    Args:
        df: The cleaned game deals DataFrame.
        n:  Number of rows to show.
    """
    pd.set_option("display.max_columns", None)
    pd.set_option("display.width", 120)
    pd.set_option("display.float_format", "{:.2f}".format)

    print("\n" + "=" * 60)
    print("  STEAM PRICE INTELLIGENCE — Data Preview")
    print("=" * 60)
    print(df.head(n).to_string(index=False))
    print("=" * 60)
    print(f"  Shape: {df.shape[0]} rows × {df.shape[1]} columns")
    print("=" * 60 + "\n")

    # Quick summary stats on pricing
    if "savings" in df.columns:
        print(f"[STATS] Average discount:  {df['savings'].mean():.1f}%")
        print(f"[STATS] Max discount:      {df['savings'].max():.1f}%")
    if "salePrice" in df.columns:
        print(f"[STATS] Cheapest deal:    ${df['salePrice'].min():.2f}")
        print(f"[STATS] Most expensive:   ${df['salePrice'].max():.2f}")
    print()


# ---------------------------------------------------------------------------
# Database Hook (placeholder for Phase 2)
# ---------------------------------------------------------------------------

def save_to_database(df: pd.DataFrame) -> None:
    """
    Placeholder: Insert cleaned deal data into MySQL via SQLAlchemy.

    This function will be implemented in Phase 2 once the database
    schema and SQLAlchemy engine are configured.

    Args:
        df: Cleaned DataFrame to persist.
    """
    # TODO (Phase 2): Replace this stub with real SQLAlchemy logic.
    #
    # Example implementation:
    #   from sqlalchemy import create_engine
    #   engine = create_engine("mysql+pymysql://user:pass@localhost/steam_db")
    #   df.to_sql("price_history", con=engine, if_exists="append", index=False)
    #   print("[DB] Data inserted into price_history table.")

    print("[DB]  Database storage not yet configured (Phase 2).")
    print(f"[DB]  Ready to insert {len(df)} rows when database is connected.")


# ---------------------------------------------------------------------------
# Main Entry Point
# ---------------------------------------------------------------------------

def main() -> None:
    """
    Main pipeline:
        1. Fetch raw deals from CheapShark API
        2. Build a typed DataFrame
        3. Clean the data
        4. Preview results
        5. (Later) Save to MySQL
    """
    print("\n Steam Price Intelligence Platform — Data Collection")
    print(" Module: fetch_games.py\n")

    # Step 1: Fetch
    raw_deals = fetch_raw_deals(page_size=PAGE_SIZE)

    # Step 2: Structure
    df = build_dataframe(raw_deals)

    # Step 3: Clean
    df = clean_dataframe(df)

    # Step 4: Preview
    preview_data(df, n=5)

    # Step 5: Persist (Phase 2 — currently a placeholder)
    save_to_database(df)


if __name__ == "__main__":
    main()