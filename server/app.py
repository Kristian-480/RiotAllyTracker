from flask import Flask, redirect, url_for, jsonify,request
from flask_cors import CORS
import requests
import json

app=Flask(__name__)
cors = CORS(app, origins='*')

API_KEY = "RGAPI-9777556f-a399-44a8-b952-a729dbdd947e"

@app.route("/users/<user>/<tag>",methods={'GET'})
def users(user,tag):
    response = requests.get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{user}/{tag}?api_key={API_KEY}") 
    accountUser = response.json()
    data = json.dumps(accountUser)

    response = requests.post("http://127.0.0.1:8080/usersinfo/",json=data)
    accountUser.update(response.json())

    response = requests.post("http://127.0.0.1:8080/topchamp/",json=data)
    accountUser.update(response.json())

    return accountUser

@app.route("/users-by-id/<user>/",methods={'GET'})
def users_By_ID(user):
    response = requests.get(f"https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/{user}?api_key={API_KEY}") 
    accountUser = response.json()
    data = json.dumps(accountUser)

    response = requests.post("http://127.0.0.1:8080/usersinfo/",json=data)
    accountUser.update(response.json())

    response = requests.post("http://127.0.0.1:8080/topchamp/",json=data)
    accountUser.update(response.json())


    return accountUser

@app.route("/usersinfo/",methods=['GET','POST'])
def usersinfo():
    data=json.loads(request.get_json())
    response = requests.get(f"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{data['puuid']}?api_key={API_KEY}")
    data.update(response.json()) 

    return data

@app.route("/userRank/<user>/",methods={'GET'})
def userRank(user):
    response = requests.get(f"https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/{user}?api_key={API_KEY}") 
    userRanks = response.json()

    return userRanks

@app.route("/history/<puuid>/<mode>/",methods={'GET'})
def history(puuid,mode):
    if mode == "all":
        response = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=10&api_key={API_KEY}")
    elif mode =="solo":
        response = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?queue=420&type=ranked&start=0&count=10&api_key={API_KEY}")
    elif mode =="flex":
        response = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?queue=440&type=ranked&start=0&count=10&api_key={API_KEY}")

    
    matchresult=[]

    for match in response.json():
        matchresponse = requests.get(f"https://americas.api.riotgames.com/lol/match/v5/matches/{match}?api_key={API_KEY}")
        # if matchresponse.json()['info']['endOfGameResult'] != "Abort_Unexpected": To be revisited as my match history broke for random abortions
        matchresult.append(matchresponse.json())#match metadata for site user

    return matchresult

@app.route("/topchamp/",methods=['GET','POST'])
def topchamp():
    data=json.loads(request.get_json())
    response = requests.get(f"https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{data['puuid']}/top?count=1&api_key={API_KEY}")
    tc={'tc' : response.json()[0]['championId']}
    data.update(tc)

    return data



if __name__ == "__main__":
    app.run(debug=True, port=8080, threaded=True)