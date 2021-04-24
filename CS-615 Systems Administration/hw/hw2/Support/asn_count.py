import trparse

with open('Fedora/telnet-traceroute.txt', 'r') as file:
    data = file.read().split("\n\n")

asns = {}

for raw_route in data:
    route = trparse.loads(raw_route)

    for hop in route.hops:
        for probe in hop.probes:
            if probe.ip in asns:
                asns[probe.ip] += 1
            else:
                asns[probe.ip] = 1

sorted_asns = dict(sorted(asns.items(), key=lambda item: item[1]))

print(sorted_asns)