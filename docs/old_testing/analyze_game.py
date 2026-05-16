import requests
import pandas as pd

url = "https://www.cheapshark.com/api/1.0/deals?pageSize=60"

response = requests.get(url)

data = response.json()

df = pd.DataFrame(data)

print(df[["external", "cheapest", "steamAppID"]])