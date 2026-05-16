import pandas as pd
import matplotlib.pyplot as plt

from ml.data_collection.fetch_games import (
    PAGE_SIZE,
    fetch_raw_deals,
    build_dataframe,
    clean_dataframe,
)



# Data Loading

def load_clean_deals() -> pd.DataFrame:
    """
    Load and clean CheapShark deal data using the existing data pipeline.

    Returns:
        A cleaned Pandas DataFrame ready for analysis.
    """
    raw_deals = fetch_raw_deals(page_size=PAGE_SIZE)
    deals_df = build_dataframe(raw_deals)
    cleaned_df = clean_dataframe(deals_df)

    return cleaned_df


# Analytics


def get_top_discounts(df: pd.DataFrame, limit: int = 10) -> pd.DataFrame:
    """
    Get the games with the highest discount percentages.
    """
    return df.sort_values(by="savings", ascending=False).head(limit)


def get_cheapest_games(df: pd.DataFrame, limit: int = 10) -> pd.DataFrame:
    """
    Get the cheapest games based on sale price.
    """
    return df.sort_values(by="salePrice", ascending=True).head(limit)


def calculate_summary_statistics(df: pd.DataFrame) -> dict:
    """
    Calculate key summary statistics for the deal data.

    Returns:
        Dictionary containing average prices, discounts, and extreme values.
    """
    most_expensive_game = df.loc[df["salePrice"].idxmax()]
    cheapest_game = df.loc[df["salePrice"].idxmin()]

    return {
        "average_sale_price": df["salePrice"].mean(),
        "average_discount_percentage": df["savings"].mean(),
        "most_expensive_game": most_expensive_game,
        "cheapest_game": cheapest_game,
    }


# Display Helpers

def print_section_title(title: str) -> None:
    """
    Print a clean section title for console output.
    """
    print("\n" + "=" * 70)
    print(title.upper())
    print("=" * 70)


def print_games_table(df: pd.DataFrame, columns: list[str]) -> None:
    """
    Print selected game columns in a readable table format.
    """
    print(df[columns].to_string(index=False))


def print_summary_statistics(stats: dict) -> None:
    """
    Print average sale price, average discount, most expensive game,
    and cheapest game.
    """
    most_expensive = stats["most_expensive_game"]
    cheapest = stats["cheapest_game"]

    print_section_title("Summary Statistics")

    print(f"Average sale price:        ${stats['average_sale_price']:.2f}")
    print(f"Average discount:          {stats['average_discount_percentage']:.2f}%")

    print("\nMost expensive game:")
    print(f"  Title:                   {most_expensive['title']}")
    print(f"  Sale price:              ${most_expensive['salePrice']:.2f}")
    print(f"  Normal price:            ${most_expensive['normalPrice']:.2f}")
    print(f"  Discount:                {most_expensive['savings']:.2f}%")

    print("\nCheapest game:")
    print(f"  Title:                   {cheapest['title']}")
    print(f"  Sale price:              ${cheapest['salePrice']:.2f}")
    print(f"  Normal price:            ${cheapest['normalPrice']:.2f}")
    print(f"  Discount:                {cheapest['savings']:.2f}%")



# Visualizations

def plot_top_discounts(top_discounts: pd.DataFrame) -> None:
    """
    Create a bar chart showing the top discounted games.
    """
    plt.figure(figsize=(12, 6))
    plt.bar(top_discounts["title"], top_discounts["savings"])

    plt.title("Top 10 Highest Game Discounts")
    plt.xlabel("Game")
    plt.ylabel("Discount Percentage (%)")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.show()


def plot_cheapest_games(cheapest_games: pd.DataFrame) -> None:
    """
    Create a bar chart showing the cheapest games.
    """
    plt.figure(figsize=(12, 6))
    plt.bar(cheapest_games["title"], cheapest_games["salePrice"])

    plt.title("Top 10 Cheapest Games")
    plt.xlabel("Game")
    plt.ylabel("Sale Price ($)")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout()
    plt.show()


# ---------------------------------------------------------------------------
# Main Program
# ---------------------------------------------------------------------------

def main() -> None:
    """
    Main analytics pipeline:
        1. Load cleaned CheapShark deal data
        2. Calculate discount and price analytics
        3. Print results clearly
        4. Display visualizations
    """
    print("\nSteam Price Intelligence Platform - Discount Analysis")

    deals_df = load_clean_deals()

    top_discounts = get_top_discounts(deals_df, limit=10)
    cheapest_games = get_cheapest_games(deals_df, limit=10)
    summary_stats = calculate_summary_statistics(deals_df)

    display_columns = [
        "title",
        "salePrice",
        "normalPrice",
        "savings",
        "dealRating",
    ]

    print_section_title("Top 10 Highest Discounts")
    print_games_table(top_discounts, display_columns)

    print_section_title("Top 10 Cheapest Games")
    print_games_table(cheapest_games, display_columns)

    print_summary_statistics(summary_stats)

    plot_top_discounts(top_discounts)
    plot_cheapest_games(cheapest_games)


if __name__ == "__main__":
    main()