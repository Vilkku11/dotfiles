NETSPEEDSRC := ags/netspeed/netspeed.cpp
NETSPEEDBIN := ags/netspeed/Netspeed

$(NETSPEEDBIN): $(NETSPEEDSRC)
	g++ -O2 -Wall -Wextra -o $@ $<


.PHONY: clean
clean:
	rm -f $(NETSPEEDBIN)