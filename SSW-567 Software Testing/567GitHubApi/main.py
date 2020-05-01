import requests, json

def getRepositories(user):
    req = "https://api.github.com/users/" + user + "/repos"
    res = requests.get(req)
    string = ""
    for item in res.json():
        reqCommits = "https://api.github.com/repos/" + user + "/" + item['name'] + "/commits"
        resCommits = requests.get(reqCommits)
        string += "Repo: " + item['name'] + " Number of commits: "+ str(len(resCommits.json())) + "\n"
    return string

# print("Pick a username")
# user = input()
# print(getRepositories(user))
