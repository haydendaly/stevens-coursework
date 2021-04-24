import trparse

with open('Fedora/telnet-traceroute.txt', 'r') as file:
    data = file.read().split("\n\n")

result = open("traceroute.txt", "a")

for raw_route in data:
    route = trparse.loads(raw_route)
    result.write(f"""

# 

## Info

Dest. Name:     {route.dest_name}      
Dest. IP :      {route.dest_ip}

## Original traceroute

{raw_route}

## Cleaned traceroute

{route}## Hops

""")
    for hop in route.hops:
        result.write(f"Hop #{hop.idx}\n")
        result.write(f"Name: {hop.probes[0].name}  IP: {hop.probes[0].ip} asn: {hop.probes[0].asn} rtp: {hop.probes[0].rtt}\n")

result.close()