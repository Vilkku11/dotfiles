NETSPEEDSRC := ags/netspeed/netspeed.cpp
NETSPEEDBIN := ags/netspeed/netspeed

$(NETSPEEDBIN): $(NETSPEEDSRC)
	g++ -O2 -Wall -o $@ $<


.PHONY: clean
clean:
	rm -f $(NETSPEEDBIN)