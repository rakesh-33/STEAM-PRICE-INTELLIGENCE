import requests
url = "https://www.cheapshark.com/api/1.0/deals?pageSize=60"
response = requests.get(url)
data = response.json()
for game in data:
    print("Title:", game["external"])
    print("Cheapest Price:", game["cheapest"])
    print("Steam App ID:", game["steamAppID"])
    print("----------------")