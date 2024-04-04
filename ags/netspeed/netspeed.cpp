#include <fstream>
#include <iostream>
#include <string>
#include <sstream>
#include <iomanip>
#include <unistd.h>
#include <nlohmann/json.hpp>
//#include <stdio.h>


struct NetworkData {
    long long rx_bytes_prev;
    long long tx_bytes_prev;

    long long rx_bytes;
    long long tx_bytes;

    double rx_speed;
    double tx_speed;

    std::string interface;
    std::string unit;

    std::ostringstream rx_speed_str;
    std::ostringstream tx_speed_str;
};

void readData(NetworkData *data) {
    std::ifstream file("/proc/net/dev");
    std::string line;

    std::getline(file, line);
    std::getline(file, line);

    long long rx, tx = 0;
    std::string iface;

    while (std::getline(file, line)) {
        std::string discard;
        std::istringstream iss(line);
        iss >> iface;

        if (iface == data->interface) {
            iss >> data->rx_bytes;
            
            for(int i = 0; i < 7;i++){
                iss >> discard;
            }
            iss >> data->tx_bytes;
            return;
        }
    }
    data->rx_bytes = 0;
    data->tx_bytes = 0;
    return;
}

int main(int argc, char * argv[]) {

    // Initialize
    NetworkData data = {0};
    // Which interface?
    data.interface = "wlp5s0:";
    

    while(true) {
        readData(&data);

        data.rx_speed = (data.rx_bytes - data.rx_bytes_prev)*8 / 1000;
        data.tx_speed = (data.tx_bytes - data.tx_bytes_prev)*8 / 1000;


        if(data.rx_speed > 999.0 || data.tx_speed > 999.0) {
            data.rx_speed /= 1000;
            data.tx_speed /= 1000;
            data.unit = "Mbit/s";
        }else {
            data.unit = "kbit/s";
        }

        data.rx_speed_str << std::fixed << std::setprecision(2) << data.rx_speed << " " << data.unit;
        data.tx_speed_str << std::fixed << std::setprecision(2) << data.tx_speed << " " << data.unit;

        nlohmann::json json_obj = {
            {"D", data.rx_speed_str.str()},
            {"U", data.tx_speed_str.str()}
        };
        std::cout << json_obj.dump() << std::endl;

        data.rx_bytes_prev = data.rx_bytes;
        data.tx_bytes_prev = data.tx_bytes;
        data.rx_speed_str.str("");
        data.tx_speed_str.str("");


        sleep(1);
        //break;
    }
    return 0;
}